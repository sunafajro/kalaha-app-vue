<template>
  <div class="row" v-if="book">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <ol class="breadcrumb">
        <li>
          <router-link :to="{ name: 'books' }">Книги</router-link>
        </li>
        <li>
          {{ book.title }}
        </li>
      </ol>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="row">
        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
          <MiniDictionary />
          <b>Вӗреневсем:</b>
          <div v-if="Array.isArray(book.parts) && book.parts.length">
            <div
              :key="'part-' + partNum"
              v-for="partNum in Object.keys(book.parts)"
            >
              <p style="margin: 0.5rem 0">{{ book.parts[partNum].title }}</p>
              <button
                :class="
                  'side-menu-chapter-button btn btn-sm btn-' +
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
          <div v-if="Array.isArray(book.parts) && !book.parts.length">
            <button
              :class="
                'side-menu-chapter-button btn btn-sm btn-' +
                  (chapter.id == selectedChapter ? 'primary' : 'default')
              "
              @click="selectChapter(chapter.id)"
              :key="'chapter-' + chapter.id"
              v-for="chapter in book.chapters"
            >
              {{ chapter.id | formatNum }}
            </button>
          </div>
        </div>
        <div class="col-xs-12 col-sm-10">
          <div v-if="chapter && chapter.audios">
            <p><b>Итлемелли материалсем:</b></p>
            <AudioPlayer :fileUrl="prepareUrl(book, chapter.audios[0])" />
          </div>
          <div v-if="chapter && chapter.pages">
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
      book(state) {
        return state.books.item;
      },
      contentUrl(state) {
        return state.baseUrl + state.contentUrl;
      },
    }),
    chapter() {
      return this.book.hasOwnProperty('chapters') && Array.isArray(this.book.chapters) ? this.book.chapters.find(chapter => chapter.id === this.selectedChapter) : null;
    },
  },
  async created() {
    await this.getBook({ id: this.id });
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
    ...mapActions(['getBook']),
    prepareUrl(book, file) {
      return prepareFileUrl({
        id: this.id,
        file,
        baseUrl: this.contentUrl,
      });
    },
    selectChapter(num) {
      this.selectedChapter = num;
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.side-menu-chapter-button {
  margin: 0.5rem;
}
</style>
