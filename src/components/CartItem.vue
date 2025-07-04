<template>
  <div class="container">
    <div v-if="normalizedProducts.length === 0" class="text-center">
      <div class="alert alert-dark" role="alert">
        Não há produtos no carrinho
      </div>
    </div>

    <div
      v-for="(product, index) in normalizedProducts"
      :key="index"
      class="d-flex align-items-center justify-content-between px-3 py-2 rounded-pill bg-box mb-3"
    >
      <img :src="product.image" alt="Produto" class="rounded-circle img-product me-2" width="40" height="40" />

      <div class="flex-grow-1 me-3">
        <div class="fw-semibold">
          {{ product.name?.length > 18 ? product.name.slice(0, 18) + '...' : product.name }}
        </div>
        <small class="text-website">{{ product.price }}</small>
      </div>

      <div class="d-flex align-items-center justify-content-center gap-2">
        <button class="btn p-0">
          <img @click="minus()" src="@/assets/icons/minus-cart.png" width="18" />
        </button>
        <span class="fw-semibold count">{{ product.quantity }}</span>
        <button class="btn p-0">
          <img @click="plus()" src="@/assets/icons/plus-cart.png" width="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  computed: {
    normalizedProducts() {
      return Array.isArray(this.products) ? this.products : [];
    },
  },
  mounted() {
    console.log(this.normalizedProducts);
  },
  methods: {
    plus() {
      console.log('plus')
    },
    minus() {
      console.log('minus')
    }
  },
};
</script>
