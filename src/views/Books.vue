<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-12 col-md-6 col-lg-3 text-center"
      style="margin-bottom: 1rem"
      :key="'book-' + book.id"
      v-for="book in books"
    >
      <router-link
        :to="{
          name: 'book',
          params: { bookId: String(book.id), chapterId: '1' },
        }"
      >
        <img class="img-responsive" :src="prepareUrl(book)" :alt="book.title" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { prepareFileUrl } from '../helpers';

export default {
  computed: {
    ...mapState({
      books(state) {
        return state.books.items;
      },
      contentUrl(state) {
        return state.baseUrl + state.contentUrl;
      },
    }),
  },
  async created() {
    await this.getBooks();
  },
  methods: {
    ...mapActions(['getBooks']),
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
