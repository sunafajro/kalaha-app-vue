import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { prepareSearchUrl } from '../helpers';

Vue.use(Vuex);

const el = document.getElementById('app');

export default new Vuex.Store({
  state: {
    baseUrl: el.dataset.baseUrl,
    contentUrl: el.dataset.contentUrl,
    symbols: [],
  },
  mutations: {},
  modules: {
    books: {
      state: {
        booksUrl: el.dataset.booksUrl,
        item: {},
        items: [],
      },
      mutations: {
        updateBook(state, data) {
          state.item = data;
        },
        updateBooks(state, data) {
          state.items = data;
        },
      },
      actions: {
        async getBook({ commit, rootState, state }, { id }) {
          try {
            const { data } = await axios.get(
              rootState.baseUrl + state.booksUrl + '/' + id
            );
            commit('updateBook', data);
          } catch (e) {
            throw new Error(
              'Произошла ошибка: ' + (e && e.message ? ' ' + e.message : '')
            );
          }
        },
        async getBooks({ commit, rootState, state }) {
          try {
            const { data } = await axios.get(
              rootState.baseUrl + state.booksUrl
            );
            commit('updateBooks', data);
          } catch (e) {
            throw new Error(
              'Произошла ошибка: ' + (e && e.message ? ' ' + e.message : '')
            );
          }
        },
      },
    },
    dictionary: {
      state: {
        dictionaryUrl: el.dataset.dictsUrl,
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
                  baseUrl: rootState.baseUrl + state.dictionaryUrl,
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
