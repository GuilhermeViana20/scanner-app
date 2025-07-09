import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CartActive from '../views/CartActive.vue';
import Profile from '../views/Profile.vue';
import Scanner from '../views/Scanner.vue';
import Detail from '../views/Detail.vue';
import Search from '../views/Search.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import RecoveryPassword from '../views/RecoveryPassword.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { public: true } },
  { path: '/register', name: 'Register', component: Register, meta: { public: true } },
  { path: '/recovery-password', name: 'RecoveryPassword', component: RecoveryPassword, meta: { public: true } },
  { path: '/', name: 'Home', component: Home },
  { path: '/active', name: 'CartActive', component: CartActive },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/scanner', name: 'Scanner', component: Scanner },
  { path: '/detail/:id', name: 'Detail', component: Detail },
  { path: '/search', name: 'Search', component: Search },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.meta.public;
  const token = localStorage.getItem('token');

  if (!isPublic && !token) {
    return next('/login');
  }

  next();
});

export default router;
