<template>
    <div class="mb-3">
        <Navbar title="Histórico de Compras" />

        <div @click="$router.push('/search')" class="container mb-3">
            <input type="email" class="form-control" id="search" placeholder="Buscar produtos...">
        </div>

        <div class="section-action container">
            <div class="row align-items-center g-0">
                <div class="col-auto">
                    <button class="btn btn-light btn-rounded p-4 height-fixed" data-bs-toggle="modal" data-bs-target="#addCartModal">
                        <img src="@/assets/icons/plus.png" alt="">
                    </button>
                </div>
                <div class="col ms-3 height-fixed">
                    <button @click="goToActiveCart"
                        class="cart-active p-4 text-white d-flex flex-column justify-content-between h-100 w-100 text-start">
                        <div class="icon mb-3">
                            <img src="@/assets/icons/cart-fill.png" alt="">
                        </div>

                        <div class="mt-auto">
                            <div class="fw-bold">{{ cartActive.store_name ?? 'Nenhum carrinho ativo' }}</div>
                            <div class="text-white font-small fw-bold">
                                {{ cartActive.quantity_term ?? '0 produtos' }} | {{ cartActive.total ?? 'R$ 0,00' }}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <Purchases :carts="carts" />

        <div class="modal fade" id="addCartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Adicionar Carrinho</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Título</label>
                            <input type="email" class="form-control" id="title" v-model="titleCart"
                                placeholder="Informe um título">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="createCart()" type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            aria-label="Close">
                            <img src="@/assets/icons/diskette.png" style="margin-top: -5px;" width="20">
                            <span class="ms-1">Salvar Carrinho</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <nav class="d-flex justify-content-center mt-4" v-if="meta.total > 0">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: meta.current_page === 1 }">
                    <a class="page-link" href="#" @click.prevent="getCarts(meta.current_page - 1)">Anterior</a>
                </li>

                <li class="page-item" v-for="page in visiblePages" :key="page"
                    :class="{ active: meta.current_page === page }">
                    <a class="page-link" href="#" @click.prevent="getCarts(page)">{{ page }}</a>
                </li>

                <li class="page-item" :class="{ disabled: meta.current_page === meta.last_page }">
                    <a class="page-link" href="#" @click.prevent="getCarts(meta.current_page + 1)">Próxima</a>
                </li>
            </ul>
        </nav>

        <Toast v-if="showToast" :message="toastMessage" :type="type" @close="showToast = false" />
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Purchases from '../components/Purchases.vue';
import Toast from '../components/Toast.vue';
import api from '../services/axios';

export default {
    name: 'Home',
    components: {
        Navbar,
        Purchases,
        Toast
    },
    data() {
        return {
            cartActive: {},
            carts: [],
            meta: {
                total: 0,
                per_page: 5,
                current_page: 1,
                last_page: 1
            },
            titleCart: '',
            user: [],
            type: 'warning',
            toastMessage: '',
            showToast: false
        }
    },
    methods: {
        async getCartActive() {
            const response = await api.post(`/users/${this.user.id}/cart/active`);
            this.cartActive = response.data.cart;
        },
        async getCarts(page = 1) {
            const response = await api.get(`/users/${this.user.id}/carts?page=${page}`);
            this.carts = response.data.carts;
            this.meta = response.data.meta;
        },
        goToActiveCart() {
            if (!this.cartActive || Object.keys(this.cartActive).length === 0) {
                this.toastMessage = 'Nenhum carrinho ativo encontrado.';
                this.showToast = true;
                return;
            }
            this.$router.push('/active');
        },
        async createCart() {
            if (!this.titleCart.trim()) {
                alert('Informe um título válido.');
                return;
            }

            const response = await api.post('/users/1/cart', { title: this.titleCart });
            if (response.status == 201) {
                this.$router.push('/active');
            }
        },
        async getUser() {
            this.user = JSON.parse(localStorage.getItem('user'));
            console.log(this.user);
        },
    },
    mounted() {
        this.getUser();
        this.getCartActive();
        this.getCarts(1);
    },
    computed: {
        visiblePages() {
            const total = this.meta.last_page;
            const current = this.meta.current_page;
            const delta = 2;
            const pages = [];

            const start = Math.max(1, current - delta);
            const end = Math.min(total, current + delta);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        }
    }
};
</script>