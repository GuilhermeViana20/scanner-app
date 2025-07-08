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
	{ path: '/', name: 'Home', component: Home },
	{ path: '/active', name: 'CartActive', component: CartActive },
	{ path: '/profile', name: 'Profile', component: Profile },
	{ path: '/scanner', name: 'Scanner', component: Scanner },
	{ path: '/detail/:id', name: 'Detail', component: Detail },
	{ path: '/search', name: 'Search', component: Search },
	{ path: '/login', name: 'Login', component: Login },
	{ path: '/register', name: 'Register', component: Register },
	{ path: '/recovery-password', name: 'RecoveryPassword', RecoveryPassword },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
