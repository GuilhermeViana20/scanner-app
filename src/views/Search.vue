<template>
	<div class="mb-3">
		<Navbar title="Buscar Produtos" :back="true" />

		<div class="container mb-3">
			<div class="d-flex gap-2 mb-4">
				<div class="flex-grow-1">
					<input v-model="query" type="text" class="form-control" id="search" placeholder="Buscar produtos...">
				</div>

				<div>
					<button @click="searchProduct()" class="btn btn-primary">
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
								<img v-if="product.image == null" src="../assets/img/product_default.png" class="card-img-top width-modify" alt="Imagem do Produto">
								<img v-else :src="product.image" class="card-img-top width-modify" alt="Imagem do Produto">
							</div>
							<div class="card-body">
								<h6 class="card-title">{{ product.name }}</h6>
								{{ product.name.length > 18 ? product.name.slice(0, 18) + '...' : product.name }}
								<p class="card-text">{{ product.price }}</p>
								<button href="#" class="btn btn-primary">Ver mais</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import api from '../services/axios';

export default {
	name: 'Search',
	components: {
		Navbar,
	},
	data() {
		return {
			query: '',
			products: [],
		};
	},
	methods: {
		async searchProduct() {
			try {
				const response = await api.get(`/products/search?q=${this.query}`);
				this.products = response.data;
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