<!-- src/components/BarcodeScanner.vue -->
<template>
	<div class="container text-center">
		<p>{{ statusMessage }}</p>

		<div class="video-container mb-3">
			<video ref="video" autoplay playsinline />
			<div class="detector-frame"></div>
		</div>
		
		<p v-if="barcodeValue">
			<img class="top-ajustment" src="@/assets/icons/barcode.png" width="30"> <strong>{{ barcodeValue }}</strong>
		</p>

		<p>
			<button v-if="barcodeValue" @click="searchProduct()" class="btn btn-primary">
				<img class="me-2 top-ajustment" src="@/assets/icons/search-white.png" width="20">Consultar Produto
			</button>
		</p>

		<pre v-if="errorMessage" style="color: red; white-space: pre-wrap;">
			{{ errorMessage }}
		</pre>

		<Toast
            v-if="showToast"
            :message="toastMessage"
            :type="'danger'"
            @close="showToast = false"
        />
	</div>

	<div>
		<div>

		</div>
	</div>
</template>

<script>
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/browser';
import api from '../services/axios';
import Toast from './Toast.vue';

export default {
	data() {
		return {
			video: null,
			statusMessage: 'Iniciando...',
			errorMessage: '',
			barcodeValue: '',
			product: [],
			codeReader: null,
			toastMessage: '',
            showToast: false
		};
	},
	components: {
		Toast
	},
	mounted() {
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
					this.barcodeValue = result.getText();
					this.statusMessage = 'Código detectado!';
				}
			});
		},
		async searchProduct() {
			try {
				const response = await api.post(`/products/scan?gtin=${this.barcodeValue}`);
				this.product = response.data;
			} catch (err) {
				this.toastMessage = 'Erro ao buscar produto: ${err.message}`';
				this.showToast = true;
			}
		}
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
	height: 318px;
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
</style>
