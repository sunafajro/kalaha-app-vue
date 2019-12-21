import Vue from 'vue';
import VueRouter from 'vue-router';
import Books from '../views/Books.vue';
import Book from '../views/Book.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/books',
  },
  {
    path: '/book/:id',
    name: 'book',
    component: Book,
    props: true,
  },
  {
    path: '/books',
    name: 'books',
    component: Books,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
