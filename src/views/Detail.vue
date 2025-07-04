<template>
    <div class="mb-3">
        <Navbar title="Detalhe do Carrinho" :back="true" />

        <CartHeader :store_name="cart.store_name" />

        <CartItem v-if="products" :products="cart.products" />
        
        <div v-else>
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span role="status">Carregando produtos...</span>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Adicionar Carrinho</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Título</label>
                            <input type="email" class="form-control" id="title" placeholder="Informe um título">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <router-link to="/active" aria-hidden="false">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
                                <img src="@/assets/icons/diskette.png" style="margin-top: -5px;" width="20">
                                <span class="ms-1">Salvar Carrinho</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="fab-container">
            <!-- Botão principal -->
            <button class="btn btn-danger rounded-circle fab-main" @click="toggleFab">
                <i :class="showOptions ? 'bi bi-x' : 'bi bi-plus'"></i>
            </button>

            <!-- Botões expandidos (acima do principal) -->
            <transition-group name="fab" tag="div" class="fab-options">
                <button v-for="(btn, index) in buttons" :key="btn.icon" class="btn rounded-circle fab-item"
                    :style="{ backgroundColor: btn.color, bottom: `${(index + 1) * 60}px` }" v-show="showOptions"
                    @click="btn.action">
                    <i :class="btn.icon"></i>
                </button>
            </transition-group>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import CartHeader from '../components/CartHeader.vue';
import Purchases from '../components/Purchases.vue';
import CartItem from '../components/CartItem.vue';
import api from '../services/axios';
export default {
    name: 'Detail',
    components: {
        Navbar,
        CartHeader,
        Purchases,
        CartItem
    },
    data() {
        return {
            showOptions: false,
            buttons: [
                {
                    icon: 'bi bi-file-earmark-pdf',
                    color: '#d32f2f',
                    action: () => alert('PDF')
                },
                {
                    icon: 'bi bi-image',
                    color: '#0dcaf0',
                    action: () => alert('Imagem')
                },
                {
                    icon: 'bi bi-whatsapp',
                    color: '#25d366',
                    action: () => alert('WhatsApp')
                },
                {
                    icon: 'bi bi-envelope',
                    color: '#d44638',
                    action: () => alert('Email')
                }
            ],
            cart: []
        };
    },
    methods: {
        toggleFab() {
            this.showOptions = !this.showOptions;
        },
        async getCart(cartId) {
            const response = await api.get(`/users/1/cart/${cartId}`);
            this.cart = response.data.cart;
        },
    },
    mounted() {
        const cartId = this.$route.params.id;
        this.getCart(cartId);
    },
};
</script>

<style scoped>
.fab-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1050;
}

.fab-main {
    width: 60px;
    height: 60px;
    font-size: 24px;
    position: relative;
    z-index: 2;
}

.fab-options {
    position: absolute;
    bottom: 10px;
    right: 8px;
}

.fab-item {
    position: absolute;
    right: 0;
    width: 45px;
    height: 45px;
    color: #fff;
    font-size: 18px;
    z-index: 1;
    opacity: 1;
    transition: all 0.3s ease;
}

/* Animação Vue */
.fab-enter-active,
.fab-leave-active {
    transition: all 0.3s ease;
}

.fab-enter-from,
.fab-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>