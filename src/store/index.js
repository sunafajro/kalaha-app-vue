import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { prepareSearchUrl } from '../helpers';

Vue.use(Vuex);

const el = document.getElementById('app');

export default new Vuex.Store({
  state: {
    contentUrl: '',
    searchUrl: '',
    symbols: [],
  },
  mutations: {
    updateAppData(state, data) {
      state.contentUrl = data.contentUrl;
      state.searchUrl = data.searchUrl;
      state.symbols = data.symbols;
    },
  },
  modules: {
    main: {
      state: {
        books: {},
      },
      mutations: {
        updateBooksData(state, data) {
          state.books = data.books;
        },
      },
      actions: {
        async getAppData({ commit }) {
          try {
            const { data } = await axios.get(el.dataset.appUrl);
            commit('updateAppData', data);
            commit('updateBooksData', data);
          } catch (e) {
            throw new Error(
              'Произошла ошибка: ' + (e && e.message ? ' ' + e.message : '')
            );
          }
        },
      },
    },
    dict: {
      state: {
        limit: 5,
        offset: 0,
        term: '',
        terms: [],
      },
      mutations: {
        updateDictData(state, data) {
          state.terms = data.terms;
        },
        updateTerm(state, data) {
          state.term = data;
        },
      },
      actions: {
        async searchTerm({ commit, rootState, state }) {
          if (state.term.length) {
            try {
              const { data } = await axios.get(
                prepareSearchUrl({
                  term: state.term,
                  limit: state.limit,
                  offset: state.offset,
                  baseUrl: rootState.searchUrl,
                })
              );
              commit('updateDictData', data);
            } catch (e) {
              throw new Error(
                'Произошла ошибка: ' + (e && e.message ? ' ' + e.message : '')
              );
            }
          }
        },
        clearTerm({ commit }) {
          commit('updateDictData', { terms: [] });
          commit('updateTerm', '');
        },
      },
    },
  },
});
