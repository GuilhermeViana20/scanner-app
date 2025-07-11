<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
            <div class="text-center mb-4">
                <img src="@/assets/logo.png" alt="Logo" style="height: 80px;" />
                <h3 class="mb-0">Cadastre-se</h3>
            </div>
            <form @submit.prevent="onRegister">
                <div class="mb-3">
                    <label for="name" class="form-label">Nome e Sobrenome</label>
                    <input type="text" class="form-control" id="name" v-model="form.name" required
                        autocomplete="username" placeholder="Seu nome e sobrenome" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="email" v-model="form.email" required
                        autocomplete="email" placeholder="Seu e-mail" />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Telefone/WhatsApp</label>
                    <input type="text" class="form-control" id="phone" v-model="form.phone" required
                        autocomplete="phone" placeholder="(85) 99999-9999" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Senha</label>
                    <input type="password" class="form-control" id="password" v-model="form.password" required
                        autocomplete="current-password" placeholder="Sua senha" />
                </div>
                <button @click.prevent="handleSubmit" type="submit" class="btn btn-primary w-100">Cadastrar</button>
            </form>
            <div class="text-center mt-3">
                <p>
                    Já possui uma conta?
                    <a href="" @click.prevent="onLoginScreen">Acessar</a>
                </p>
                <small>
                    Esqueceu a senha?
                    <a href="#" @click.prevent="onForgotPassword">Recuperar</a>
                </small>
            </div>

            <transition name="fade">
                <Toast v-if="showToast" :message="toastMessage" :type="type" @close="showToast = false" />
            </transition>
        </div>
    </div>
</template>

<script>
import api from '@/services/axios';
import Toast from '../components/Toast.vue';

export default {
    name: "Register",
    data() {
        return {
            form: {
                name: "",
                email: "",
                phone: "",
                password: "",
            },
            errors: {},
            toastMessage: '',
            showToast: true,
            type: 'danger',
        };
    },
    methods: {
        onLoginScreen() {
            this.$router.push('/login');
        },
        onForgotPassword() {
            this.$router.push('/recovery-password');
        },
        validate() {
            const errors = {};
            if (!this.form.name.trim()) {
                errors.nome = "Nome e Sobrenome são obrigatórios.";
            }
            if (!this.form.email) {
                errors.email = "E-mail é obrigatório.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
                errors.email = "E-mail inválido.";
            }
            if (!this.form.password) {
                errors.senha = "Senha é obrigatória.";
            } else if (this.form.password.length < 6) {
                errors.senha = "A senha deve ter pelo menos 6 caracteres.";
            }
            if (!this.form.phone) {
                errors.phone = "Telefone é obrigatório.";
            }
            this.errors = errors;
            return Object.keys(errors).length === 0;
        },
        async handleSubmit() {
            if (this.validate()) {
                const payload = {
                    name: this.form.name,
                    email: this.form.email,
                    phone: this.form.phone,
                    password: this.form.password,
                };

                try {
                    await api.post('/users/register', payload);
                    this.toastMessage = 'Cadastro realizado com sucesso!';
                    this.type = 'success';
                    this.showToast = true;

                    setTimeout(() => {
                        this.showToast = false;
                        this.$router.push('/login');
                    }, 2000);
                } catch (error) {
                    console.error('Erro ao cadastrar usuário:', error.response.data.error);
                    const msg = error.response.data.error || 'Erro ao cadastrar usuário.';
                    this.toastMessage = msg;
                    this.type = 'danger';
                    this.showToast = true;
                }
            }
        },
    },
};
</script>

<style scoped>
body {
    background-color: #f8f9fa;
}

.card {
    border-radius: 12px;
    border: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>