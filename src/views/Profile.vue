<template>
    <div class="mb-3">
        <Navbar title="Perfil" :back="true" />

        <div class="container mb-3 text-center">
            <div class="">
                <img class="btn-rounded" src="@/assets/img/profile.jpg" width="250" height="250">
            </div>

            <button class="btn btn-primary edit-profile mt-3" @click="changePhoto">
                <img class="icon-profile" src="@/assets/icons/pencil.png" width="20" height="20">
            </button>
        </div>

        <div class="container">
            <div class="mb-3">
                <label for="name" class="form-label fw-bold color-gray">Nome Completo</label>
                <input type="text" class="form-control" id="name"
                    placeholder="Insira seu nome e sobrenome"
                    v-model="user.name"
                >
            </div>
            <div class="mb-3">
                <label for="email" class="form-label fw-bold color-gray">E-mail</label>
                <input type="text" class="form-control" id="email"
                    placeholder="Insira seu e-mail"
                    v-model="user.email"
                >
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label fw-bold color-gray">Telefone/WhatsApp</label>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="phone">+55</span>
                    <input v-model="user.phone" type="text" class="form-control" placeholder="Insira seu telefone" aria-describedby="phone">
                </div>
            </div>

            <button @click="updateUser()" class="btn btn-primary w-100">
                <img class="top-ajustment me-1" src="@/assets/icons/diskette.png" width="20">
                Atualizar usuário
            </button>
        </div>

        <Toast
            v-if="showToast"
            :message="toastMessage"
            :type="'success'"
            @close="showToast = false"
        />
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import api from '../services/axios';
import Toast from '../components/Toast.vue';

export default {
    name: 'Profile',
    components: {
        Navbar,
        Toast
    },
    data() {
        return {
            user: [],
            toastMessage: '',
            showToast: false
        }
    },
    methods: {
        async getUser() {
            const response = await api.get('/users/1');
            this.user = response.data;
        },
        async updateUser() {
            const response = await api.put('/users/1', this.user);
            this.user = response.data.user;
            this.toastMessage = response.data.message;
            this.showToast = true;
        },
        changePhoto() {
            // lógica futura para trocar foto
        },
        closeToast() {
            this.$emit('close');
        }
    },
    mounted() {
        this.getUser()
    },
};
</script>

<style lang="scss" scoped>
.btn-rounded {
    border-radius: 150px !important;
    border: 10px solid white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
    margin-bottom: -60px;
}

.color-gray {
    color: #374856;
}

.button-edit {
    border-radius: 25px;
}

.edit-profile {
    border-radius: 45px !important;
    padding: 15px;
    width: 50px;
    height: 50px;
    margin-left: 30%;
}

.icon-profile {
    margin-top: -8px;
}
</style>