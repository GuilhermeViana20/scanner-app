<template>
    <div class="container">
        <div class="title-cart w-100 align-items-center d-flex mb-3">
            <div v-if="store_name" class="container">
                <h1 class="text-center mb-0">{{ store_name }}</h1>
            </div>
            <div v-else class="w-100 justify-content-center text-center">
                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CartHeader',
    props: {
        store_name: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.title-cart {
    background-color: #374856;
    height: 55px;
    border-radius: 16px;

    h1 {
        font-size: 22px;
        color: #FFFFFF;
    }
}
</style>