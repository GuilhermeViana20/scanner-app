<template>
    <div class="container">
        <div class="position-fixed bottom-0 start-0 end-0 bg-white shadow" style="z-index: 1050;">
            <div class="d-flex align-items-center justify-content-between bg-white rounded-pill px-3 py-2" style="gap: 10px;">
                <div class="fw-semibold text-website">{{ cart.quantity }} itens</div>

                <div class="d-flex overflow-hidden align-items-center action-buttons">
                    <div class="bg-white px-1 py-2 text-website fw-semibold">
                        {{ cart.total }}
                    </div>
                    <button class="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 rounded-0 fw-bold">
                        Finalizar
                        <img width="18" src="@/assets/icons/cart-white.png" alt="">
                    </button>
                </div>

                <router-link to="/scanner">
                    <button class="btn btn-primary scan d-flex align-items-center justify-content-center p-2 rounded-4">
                        <img src="@/assets/icons/scanner.png" width="30" height="30" alt="">
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CartFooter',
    props: {
        cart: {
            type: Array,
            required: true,
        },
    }
};
</script>

<style lang="scss" scoped>
.card-purchase {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: none;
    border-radius: 45px;
    margin-bottom: 10px;
    background-color: #F3F5F6;
}

.card-purchase:hover {
    background-color: #E8EAEC;
}

.icon {
    background-color: #FFFFFF;
    width: 45px;
    height: 45px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 32px;
}

.btn-light {
    background-color: #F3F5F6;
    border: none;
    border-radius: 25px;
}

.height-fixed {
    height: 200px;
}

.content {
    .text-title {
        font-size: 16px;
        color: #374856;
    }

    .text-muted {
        font-size: 12px;
        color: #FFFFFF;
    }
}

.font-small {
    font-size: 12px;
}

.cart-active {
    border: none;
    background-color: #97B9FF;
    padding: 10px;
    border-radius: 25px;
}

.cart-active:hover {
    background-color: #7A9BFF;
}

.section-action {
    margin-bottom: 30px;
}

.btn-primary {
    height: 40px;
    border-radius: 8px !important;
}

.count {
    font-size: 20px;
}

.img-product {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.action-buttons {
    border: solid 1px #97B9FF;
    border-radius: 16px;
    height: 50px;
}

.btn-primary {
    height: 50px;
    border-radius: 16px !important;
}

.scan {
    width: 50px;
    height: 50px;
}

.fw-semibold {
    font-size: 14px;
}
</style>