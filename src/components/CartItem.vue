<template>
  <div class="container">
    <div v-if="normalizedProducts.length === 0" class="text-center">
      <div class="alert alert-dark" role="alert">
        Não há produtos no carrinho
      </div>
    </div>

    <div v-for="(product, index) in normalizedProducts" :key="product.id" class="position-relative swipe-wrapper mb-3">
      <button @click="removeProduct(product.id)" class="btn btn-danger delete-btn">
        <img src="@/assets/icons/trash.png" width="20" alt="Excluir" />
      </button>

      <div class="swipe-item d-flex align-items-center justify-content-between px-3 py-2 rounded-pill bg-box"
        @touchstart="startTouch($event, index)" @touchmove="moveTouch($event, index)" @touchend="endTouch(index)"
        :style="{ transform: product.swiped ? 'translateX(-70px)' : 'translateX(0)' }">
        <img :src="product.image" alt="Produto" class="rounded-circle img-product me-2" width="40" height="40" />

        <div class="flex-grow-1 me-3">
          <div class="fw-semibold">
            {{ product.name?.length > 18 ? product.name.slice(0, 18) + '...' : product.name }}
          </div>
          <small class="text-website">{{ product.price }}</small>
        </div>

        <div class="d-flex align-items-center justify-content-center gap-2 me-3">
          <button class="btn p-0 top-ajustment" @click="minus(index)">
            <img src="@/assets/icons/minus-cart.png" width="18" />
          </button>
          <span class="fw-semibold count">{{ product.quantity }}</span>
          <button class="btn p-0 top-ajustment" @click="plus(index)">
            <img src="@/assets/icons/plus-cart.png" width="18" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/axios';

export default {
  name: 'CartItem',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      touchStartX: 0,
      productsState: [],
    };
  },
  computed: {
    normalizedProducts() {
      return this.productsState.length ? this.productsState : this.products;
    },
  },
  watch: {
    products: {
      immediate: true,
      handler(newVal) {
        this.productsState = newVal.map(p => ({ ...p, swiped: false }));
      },
    },
  },
  methods: {
    plus(index) {
      const product = this.normalizedProducts[index];
      this.updateQuantity(product.id, product.quantity + 1, index);
    },
    minus(index) {
      const product = this.normalizedProducts[index];
      if (product.quantity > 1) {
        this.updateQuantity(product.id, product.quantity - 1, index);
      }
    },
    async updateQuantity(id, quantity, index) {
      try {
        await api.put(`/cart/items/${id}`, { quantity });
        this.productsState[index].quantity = quantity;
        this.$emit('update');
      } catch (error) {
        console.error('Erro ao atualizar:', error);
      }
    },
    async removeProduct(id) {
      try {
        await api.delete(`/cart/items/${id}`);
        this.productsState = this.productsState.filter(p => p.id !== id);
        this.$emit('update');
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    },
    startTouch(e, index) {
      this.touchStartX = e.changedTouches[0].screenX;
      this.productsState[index].swiped = false;
    },
    moveTouch(e, index) {
      const diffX = this.touchStartX - e.changedTouches[0].screenX;
      this.productsState[index].swiped = diffX > 50;
    },
    endTouch(index) {
      // nada aqui por enquanto
    },
  },
};
</script>

<style scoped>
.swipe-wrapper {
  position: relative;
  overflow: hidden;
}

.swipe-item {
  position: relative;
  transition: transform 0.3s ease;
  z-index: 1;
}

.delete-btn {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
  z-index: 0;
}
</style>
