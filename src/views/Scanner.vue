<template>
    <Navbar title="Adicionar Produto" :back="true" />

    <BarcodeScanner />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import BarcodeScanner from '../components/BarcodeScanner.vue';

export default {
    name: 'Scanner',
    components: {
        Navbar,
        BarcodeScanner
    }
};
</script>