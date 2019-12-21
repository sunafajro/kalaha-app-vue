import Vue from 'vue';
import VueRouter from 'vue-router';
import Books from '../views/Books.vue';
import Book from '../views/Book.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/books/:bookId/:chapterId',
    name: 'book',
    component: Book,
    props: true,
  },
  {
    path: '/books/:bookId',
    redirect: '/books/:bookId/1',
  },
  {
    path: '/books',
    name: 'books',
    component: Books,
  },
  {
    path: '/',
    redirect: '/books',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
