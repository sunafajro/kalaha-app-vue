<template>
  <div>
    <b>Сӑмахсар:</b>
    <div class="row" style="margin-bottom: 1rem">
      <div class="col-xs-12">
        <div
          style="margin-bottom: 0.2rem"
          v-if="Array.isArray(symbols) && symbols.length"
        >
          <button
            class="btn btn-xs"
            style="margin-right: 0.2rem"
            :key="'symbol-' + index"
            v-for="(symbol, index) in symbols"
            @click="addSymbol(symbol)"
          >
            {{ symbol }}
          </button>
        </div>
        <div style="margin-bottom: 0.2rem">
          <input
            class="form-control input-sm"
            type="text"
            v-model="term"
            @keyup.enter="searchTerm"
          />
        </div>
        <div style="margin-bottom: 0.2rem">
          <button
            class="btn btn-xs btn-info"
            style="margin-right: 0.2rem"
            @click="searchTerm"
          >
            Шыра
          </button>
          <button class="btn btn-xs btn-warning" @click="clearTerm">
            Тасат
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" v-if="terms.length">
        <div
          class="panel panel-default"
          style="margin-bottom: 0.5rem"
          :key="'term-' + index"
          v-for="(term, index) in terms"
        >
          <div class="panel-body" style="padding: 0.5rem">
            <b>{{ term.cv }}:</b> {{ term.ru }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      terms(state) {
        return state.dict.terms;
      },
      symbols(state) {
        return state.symbols;
      },
    }),
    term: {
      get() {
        return this.$store.state.dict.term;
      },
      set(value) {
        this.$store.commit('updateTerm', value);
      },
    },
  },
  methods: {
    ...mapActions(['clearTerm', 'searchTerm']),
    addSymbol(s) {
      this.$store.commit('updateTerm', this.term + s);
    },
  },
};
</script>
