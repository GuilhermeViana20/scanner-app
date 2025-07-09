<!-- src/components/BarcodeScanner.vue -->
<template>
	<div class="container text-center">
		<div class="alert alert-success" role="alert">
			{{ statusMessage }}
		</div>

		<div class="video-container mb-3">
			<video ref="video" autoplay playsinline />
			<div class="detector-frame"></div>
		</div>

		<div class="mb-5">
			<p class="aligm-items-center justify-content">
				<img class="top-ajustment me-2" src="@/assets/icons/barcode.png" width="30">
				<strong>{{ barcodeValue }}</strong>

				<button @click="searchProduct()" class="btn btn-primary ms-5">
					<img class="me-2 top-ajustment" src="@/assets/icons/search-white.png" width="20">
					Consultar Produto
				</button>
			</p>
		</div>

		<div>
			<div class="form-floating mb-3">
				<input v-model="barcodeValue" type="text" class="form-control" id="barcode"
					placeholder="Código de Barras">
				<label for="barcode">Código de Barras</label>
			</div>
		</div>

		<div class="bg-box btn-rounded p-3">
			<div v-if="product && Object.keys(product).length" class="row p-0 g-2">
				<div class="row g-2 align-items-center">
					<div class="col-3">
						<img :src="product.image || 'https://i.ibb.co/fYw4g7L/no-image.jpg'" alt="Produto"
							class="img-fluid rounded" />
					</div>
					<div class="col-9">
						<h5 class="text-start">
							{{ product.description }}
						</h5>
					</div>
				</div>

				<div class="col-5">
					<div class="input-group mb-3">
						<span class="input-group-text">Preço R$</span>
						<input v-model="price" @input="formatPrice" type="text" class="form-control">
					</div>
				</div>
				<div class="col-5">
					<div class="input-group mb-3">
						<span class="input-group-text">Médio R$</span>
						<input v-model="avg_price" @input="formatPrice" type="text" class="form-control">
					</div>
				</div>
				<div class="col-2">
					<div class="mb-3">
						<input v-model="form.quantity" type="number" class="form-control" id=""
							placeholder="Quantidade">
					</div>
				</div>

				<button @click="save()" class="btn btn-primary btn-rounded">
					<img :src="addToCartIcon" width="24" alt="">
					Adicionar Produto
				</button>
			</div>
		</div>

		<pre v-if="errorMessage" style="color: red; white-space: pre-wrap;">
			{{ errorMessage }}
		</pre>

		<Toast v-if="showToast" :message="toastMessage" :type="'success'" @close="showToast = false" />
	</div>
</template>

<script>
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
import addToCartIcon from '../assets/icons/add-to-cart.png';
import api from '../services/axios';
import Toast from './Toast.vue';

export default {
	data() {
		return {
			video: null,
			statusMessage: 'Iniciando...',
			errorMessage: '',
			barcodeValue: '',
			barcodeTemp: '',
			product: [],
			codeReader: null,
			toastMessage: '',
			showToast: false,
			priceTemp: '',
			price: '',
			avg_price: '',
			form: {
				quantity: 1,
				price: '',
				product_id: null
			}
		};
	},
	components: {
		Toast
	},
	mounted() {
		this.getUser();
		this.initCamera();
	},
	beforeUnmount() {
		if (this.codeReader) {
			this.codeReader.reset();
		}
		if (this.video?.srcObject) {
			this.video.srcObject.getTracks().forEach(track => track.stop());
		}
	},
	methods: {
		async initCamera() {
			this.statusMessage = 'Tentando acessar a câmera traseira...';

			if (!navigator.mediaDevices?.getUserMedia) {
				this.statusMessage = 'Erro Crítico';
				this.errorMessage = 'Seu navegador não suporta a API getUserMedia.';
				return;
			}

			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: 'environment' }
				});
				this.statusMessage = 'Permissão OK! Câmera traseira ativa.';

				this.video = this.$refs.video;
				this.video.srcObject = stream;

				this.startBarcodeScanner();
			} catch (err) {
				console.error('Erro ao acessar a câmera:', err);
				this.statusMessage = 'Erro ao acessar câmera';
				this.errorMessage = `${err.name}: ${err.message}`;
			}
		},
		startBarcodeScanner() {
			this.codeReader = new BrowserMultiFormatReader();
			this.codeReader.decodeFromVideoDevice(null, this.video, (result, err) => {
				if (result) {
					const code = result.getText();
					if (this.barcodeValue !== code) {
						this.barcodeValue = code;
						this.statusMessage = 'Código detectado!';
					}
				}
			});
		},
		async searchProduct() {
			try {
				const response = await api.post(`/products/scan?gtin=${this.barcodeValue}`);
				this.product = response.data.product;
				this.form.product_id = this.product.id;
			} catch (err) {
				this.toastMessage = 'Erro ao buscar produto: ${err.message}`';
				this.showToast = true;
			}
		},
		async save() {
			try {
				if (!this.form.product_id) {
					this.toastMessage = 'Produto não encontrado.';
					this.showToast = true;
					return;
				}

				const numericPrice = this.priceTemp.replace(/\./g, '').replace(',', '.');
				this.form.price = parseFloat(numericPrice);

				await api.post(`/users/${this.user.id}/cart/items`, this.form);
				this.toastMessage = 'Produto adicionado no carrinho!';
				this.showToast = true;

				this.$router.push('/active').then(() => {
					window.location.reload();
				});
			} catch (error) {
				this.toastMessage = `Erro ao salvar: ${error.message}`;
				this.showToast = true;
			}
		},
		formatPrice(event) {
			let value = event.target.value.replace(/\D/g, '');
			value = (parseInt(value, 10) / 100).toFixed(2);
			const formatted = value
				.replace('.', ',')
				.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

			this.priceTemp = formatted;
		},
		async getUser() {
			this.user = JSON.parse(localStorage.getItem('user'));
		},
	}
};
</script>


<style scoped>
.camera-select {
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.camera-select label {
	font-weight: bold;
}

.camera-select select {
	padding: 8px;
	border-radius: 4px;
	border: 1px solid #ccc;
	flex-grow: 1;
}

.video-container {
	position: relative;
	width: 100%;
	max-width: 100%;
	height: 250px;
	border-radius: 40px;
	overflow: hidden;
	border: 2px solid green;
}

.video-container video {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 30px;
}

.detector-frame {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	height: 40%;
	border: 2px dashed red;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
	pointer-events: none;
}

.img-fluid {
	max-width: 120px;
	height: 120px;
}
</style>
