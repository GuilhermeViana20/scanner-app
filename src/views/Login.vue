<template>
    <div class="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
            <div class="text-center mb-4">
                <img src="@/assets/logo.png" alt="Logo" style="height: 80px;" />
                <h3 class="mb-0">Login</h3>
            </div>
            <form @submit.prevent="onLogin">
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="email"
                        required
                        autocomplete="username"
                        placeholder="Digite seu e-mail"
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
                        placeholder="Digite sua senha"
                    />
                </div>
                <button type="submit" class="btn btn-primary w-100">Entrar</button>
            </form>
            <div class="text-center mt-3">
                <p>
                    Não possui uma conta?
                    <a href="" @click.prevent="onRegisterScreen">Cadastre-se</a>
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
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        onRegisterScreen() {
            this.$router.push('/register');
        },
        onForgotPassword() {
            this.$router.push('/recovery-password');
        },
        onLogin() {
            // Lógica de autenticação aqui
            alert("Login enviado!");
        },
    },
};
</script>

<style scoped>
body {
    background-color: #f8f9fa;
}
</style>