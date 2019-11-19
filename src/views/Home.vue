<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-12 col-md-6 col-lg-3 text-center"
      style="margin-bottom: 1rem"
      :key="'book-' + num"
      v-for="num in Object.keys(books)"
    >
      <router-link :to="{ name: 'book', params: { id: num } }">
        <img
          class="img-responsive"
          :src="prepareUrl(books[num])"
          :alt="books[num].title"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { prepareFileUrl } from '../helpers';

export default {
  computed: {
    ...mapState({
      books(state) {
        return state.main.books;
      },
      contentUrl(state) {
        return state.contentUrl;
      },
    }),
  },
  methods: {
    prepareUrl(book) {
      return prepareFileUrl({
        id: book.id,
        file: book.cover,
        baseUrl: this.contentUrl,
      });
    },
  },
};
</script>
