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
            <div :key="'part-' + part.id" v-for="(part, idx) in book.parts">
              <p style="margin: 0.5rem 0">{{ book.parts[idx].title }}</p>
              <router-link
                :class="
                  'side-menu-chapter-button btn btn-sm btn-' +
                    (num == chapterId ? 'primary' : 'default')
                "
                :to="{
                  name: 'book',
                  params: { bookId: String(book.id), chapterId: String(num) },
                }"
                :key="'chapter-' + num"
                v-for="num in book.parts[idx].chapters"
              >
                {{ num | formatNum }}
              </router-link>
            </div>
          </div>
          <div v-if="Array.isArray(book.parts) && !book.parts.length">
            <router-link
              :class="
                'side-menu-chapter-button btn btn-sm btn-' +
                  (chapter.id == chapterId ? 'primary' : 'default')
              "
              :to="{
                name: 'book',
                params: {
                  bookId: String(book.id),
                  chapterId: String(chapter.id),
                },
              }"
              :key="'chapter-' + chapter.id"
              v-for="chapter in book.chapters"
            >
              {{ chapter.id | formatNum }}
            </router-link>
          </div>
        </div>
        <div class="col-xs-12 col-sm-10">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
              v-if="
                chapter && Array.isArray(chapter.audios) && chapter.audios[1]
              "
            >
              <p><b>Юрӑ:</b></p>
              <AudioPlayer :fileUrl="prepareUrl(book, chapter.audios[1])" />
              <div v-if="chapter.audios[1].text">
                <b><a href="#" @click.prevent="toggleSongText">Юрӑ сӑмахӗсем:</a></b>
                <div class="row" v-if="showSongText">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div :key="'song-text-cv' + idx" v-for="(str, idx) in chapter.audios[1].text.cv">{{ str }}</div>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div :key="'song-text-cv' + idx" v-for="(str, idx) in chapter.audios[1].text.ru">{{ str }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-6 col-lg-6"
              v-if="
                chapter && Array.isArray(chapter.audios) && chapter.audios[0]
              "
            >
              <p><b>Итлемелли материалсем:</b></p>
              <AudioPlayer :fileUrl="prepareUrl(book, chapter.audios[0])" />
            </div>
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
      return this.book &&
        this.book.hasOwnProperty('chapters') &&
        Array.isArray(this.book.chapters)
        ? this.book.chapters.find(
            chapter => String(chapter.id) === this.chapterId
          )
        : null;
    },
  },
  async created() {
    await this.getBook({ id: this.bookId });
  },
  data() {
    return {
      showSongText: false,
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
        id: this.bookId,
        file,
        baseUrl: this.contentUrl,
      });
    },
    toggleSongText() {
      this.showSongText = !this.showSongText;
    },
  },
  props: {
    bookId: {
      type: String,
      required: true,
    },
    chapterId: {
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
