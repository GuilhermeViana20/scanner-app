<template>
  <div class="section-purchases purchases container">
    <a
      v-for="cart in carts"
      :key="cart.id"
      @click.prevent="$router.push('/detail/' + cart.id)"
      href="#"
      class="text-decoration-none"
    >
      <button class="card-purchase w-100 d-flex align-items-center">
        <div class="col-auto">
          <div class="icon">
            <img src="@/assets/icons/cart.png" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="d-flex flex-column content ms-3 text-start">
            <span class="fw-bold text-title">{{ cart.store_name }}</span>
            <span class="fw-bold text-muted">{{ cart.quantity_term }} | {{ cart.total }}</span>
          </div>
        </div>
        <div class="col-auto">
          <div class="me-2">
            <img class="icon-touch" src="@/assets/icons/touch.png" alt="" />
          </div>
        </div>
      </button>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    carts: {
      type: Array,
      required: true,
    },
  },
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

.btn-light {
    background-color: #F3F5F6;
    border: none;
    border-radius: 25px;
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

.icon-touch {
    margin-top: -5px;
}
</style>