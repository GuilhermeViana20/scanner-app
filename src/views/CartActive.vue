<template>
    <Navbar title="Carrinho Atual" :back="true" />

    <CartHeader :store_name="cart.store_name" />

    <CartItem v-if="cart.products" :products="cart.products" />

    <div v-else class="text-center">
        <span class="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>
        <span role="status">Carregando produtos...</span>
    </div>

    <CartFooter :cart="cart" />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import CartItem from '../components/CartItem.vue';
import CartHeader from '../components/CartHeader.vue';
import CartFooter from '../components/CartFooter.vue';
import api from '../services/axios';
export default {
    name: 'CartActive',
    components: {
        Navbar,
        CartItem,
        CartHeader,
        CartFooter,
    },
    data() {
        return {
            cart: []
        };
    },
    methods: {
        async getCartActive() {
            const response = await api.post(`/users/1/cart/active`);
            this.cart = response.data.cart;
        },
    },
    mounted() {
        this.getCartActive();
    },
};
</script>