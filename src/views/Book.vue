<template>
  <div v-if="book">
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ name: 'home' }">Книги</router-link>
      </li>
      <li>
        {{ book.title }}
      </li>
    </ol>
    <div class="row">
      <div class="col-xs-12 col-sm-2">
        <MiniDictionary />
        <b>Вӗреневсем:</b>
        <div v-if="book.parts">
          <div
            :key="'part-' + partNum"
            v-for="partNum in Object.keys(book.parts)"
          >
            <p>{{ book.parts[partNum].title }}</p>
            <button
              :class="
                'side-menu-chapter-button btn btn-' +
                  (num == selectedChapter ? 'primary' : 'default')
              "
              @click="selectChapter(num)"
              :key="'chapter-' + num"
              v-for="num in book.parts[partNum].chapters"
            >
              {{ num | formatNum }}
            </button>
          </div>
        </div>
        <div v-if="!book.parts">
          <button
            :class="
              'side-menu-chapter-button btn btn-' +
                (num == selectedChapter ? 'primary' : 'default')
            "
            @click="selectChapter(num)"
            :key="'chapter-' + num"
            v-for="num in Object.keys(book.chapters)"
          >
            {{ num | formatNum }}
          </button>
        </div>
      </div>
      <div class="col-xs-12 col-sm-10">
        <div v-if="chapter.audios">
          <p><b>Итлемелли материалсем:</b></p>
          <AudioPlayer :fileUrl="prepareUrl(book, chapter.audios[0])" />
        </div>
        <div>
          <p><b>Вуламалли материалсем:</b></p>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <img
                alt="Страница 1"
                :src="prepareUrl(book, chapter.pages[0])"
                class="img-responsive"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <img
                alt="Страница 2"
                :src="prepareUrl(book, chapter.pages[1])"
                class="img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { prepareFileUrl } from '../helpers';
import AudioPlayer from '../components/AudioPlayer';
import MiniDictionary from '../components/MiniDictionary';

export default {
  components: {
    AudioPlayer: AudioPlayer,
    MiniDictionary: MiniDictionary,
  },
  computed: {
    ...mapState({
      books(state) {
        return state.main.books;
      },
      contentUrl(state) {
        return state.contentUrl;
      },
    }),
    book() {
      return this.books[this.$route.params.id];
    },
    chapter() {
      return this.book.chapters[this.selectedChapter];
    },
  },
  data() {
    return {
      selectedChapter: 1,
      selectedPart: 1,
    };
  },
  filters: {
    formatNum(num) {
      return num < 10 ? '0' + num : num;
    },
  },
  methods: {
    prepareUrl(book, chapterPage) {
      return prepareFileUrl({
        id: book.id,
        file: chapterPage,
        baseUrl: this.contentUrl,
      });
    },
    selectChapter(num) {
      this.selectedChapter = num;
    },
  },
};
</script>

<style>
.side-menu-chapter-button {
  margin: 5px;
}
</style>
