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
                    <input
                        type="name"
                        class="form-control"
                        id="name"
                        v-model="name"
                        required
                        autocomplete="username"
                        placeholder="Seu nome e sobrenome"
                    />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="email"
                        required
                        autocomplete="email"
                        placeholder="Seu e-mail"
                    />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Telefone/WhatsApp</label>
                    <input
                        type="phone"
                        class="form-control"
                        id="phone"
                        v-model="phone"
                        required
                        autocomplete="phone"
                        placeholder="(85) 99999-9999"
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Senha</label>
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="password"
                        required
                        autocomplete="current-password"
                        placeholder="Sua senha"
                    />
                </div>
                <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
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
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            form: {
                nome: "",
                email: "",
                senha: "",
                confirmarSenha: "",
            },
            errors: {},
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
            if (!this.form.nome.trim()) {
                errors.nome = "Nome e Sobrenome são obrigatórios.";
            }
            if (!this.form.email) {
                errors.email = "E-mail é obrigatório.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
                errors.email = "E-mail inválido.";
            }
            if (!this.form.senha) {
                errors.senha = "Senha é obrigatória.";
            } else if (this.form.senha.length < 6) {
                errors.senha = "A senha deve ter pelo menos 6 caracteres.";
            }
            if (!this.form.confirmarSenha) {
                errors.confirmarSenha = "Confirmação de senha é obrigatória.";
            } else if (this.form.senha !== this.form.confirmarSenha) {
                errors.confirmarSenha = "As senhas não coincidem.";
            }
            this.errors = errors;
            return Object.keys(errors).length === 0;
        },
        handleSubmit() {
            if (this.validate()) {
                // Aqui você pode enviar os dados para a API
                alert("Cadastro realizado com sucesso!");
                // Limpar formulário
                this.form = {
                    nome: "",
                    email: "",
                    senha: "",
                    confirmarSenha: "",
                };
                this.errors = {};
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
</style>