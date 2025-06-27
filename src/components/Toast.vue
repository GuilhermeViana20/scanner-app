<template>
  <div
    class="toast container align-items-center border-0 show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    :class="toastClass"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ message }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        aria-label="Close"
        @click="closeToast"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: 'Mensagem padrão'
    },
    duration: {
      type: Number,
      default: 3000
    },
    type: {
      type: String,
      default: 'primary', // pode ser: success, danger, warning, info
      validator: (value) => ['primary', 'success', 'danger', 'warning', 'info'].includes(value)
    }
  },
  computed: {
    toastClass() {
      return `text-bg-${this.type}`;
    }
  },
  mounted() {
    setTimeout(() => {
      this.closeToast();
    }, this.duration);
  },
  methods: {
    closeToast() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.toast {
  width: 80%;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1055;
}
</style>
