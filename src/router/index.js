import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Book from '../views/Book.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/book/:id',
    name: 'book',
    component: Book,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
