<template>
  <div class="mb-3">
    <Navbar title="Buscar Produtos" :back="true" />

    <div class="container mb-3">
      <div class="d-flex gap-2 mb-4">
        <div class="flex-grow-1">
          <input v-model="query" type="text" class="form-control" id="search" placeholder="Buscar produtos...">
        </div>

        <div>
          <button @click="searchProduct(1)" class="btn btn-primary">
            <img class="top-ajustment" src="@/assets/icons/search-white.png" width="20" alt="">
          </button>
        </div>
      </div>

      <div v-if="products.length === 0" class="text-center text-muted">
        Nenhum produto encontrado
      </div>

      <div v-else>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col" v-for="product in products" :key="product.id">
            <div class="card">
              <div class="text-center">
                <img
                  v-if="!product.image"
                  src="../assets/img/product_default.png"
                  class="card-img-top width-modify"
                  alt="Imagem do Produto"
                >
                <img
                  v-else
                  :src="product.image"
                  class="card-img-top width-modify"
                  alt="Imagem do Produto"
                >
              </div>
              <div class="card-body">
                <h6 class="card-title">{{ product.name }}</h6>
                <p class="card-text">{{ product.price }}</p>
                <button class="btn btn-primary">Ver mais</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="d-flex justify-content-center mt-4" v-if="meta.total > 0">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: meta.current_page === 1 }">
            <a class="page-link" href="#" @click.prevent="searchProduct(meta.current_page - 1)">Anterior</a>
          </li>

          <li
            class="page-item"
            v-for="page in visiblePages"
            :key="page"
            :class="{ active: meta.current_page === page }"
          >
            <a class="page-link" href="#" @click.prevent="searchProduct(page)">
              {{ page }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: meta.current_page === meta.last_page }">
            <a class="page-link" href="#" @click.prevent="searchProduct(meta.current_page + 1)">Próxima</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import api from '../services/axios';

export default {
  name: 'Search',
  components: { Navbar },

  data() {
    return {
      query: '',
      products: [],
      meta: {
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1,
      },
    };
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
  },

  methods: {
    async searchProduct(page = 1) {
      try {
        const response = await api.post(`/products/search?q=${this.query}&page=${page}`);
        this.products = response.data.products;
        this.meta = response.data.meta;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        this.products = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.width-modify {
  width: 240px;
}
</style>
