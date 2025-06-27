<template>
    <nav class="navbar mb-3">
        <div class="container">
            <div v-if="back" class="col-1">
                <button v-if="back" @click="$router.back()" class="btn btn-link p-0 m-0">
                    <img class="icon-left" src="@/assets/icons/left-arrow.png" alt="">
                </button>
            </div>
            <div :class="back ? 'col-10' : 'col-11'">
                <a class="navbar-brand">{{ title }}</a>
            </div>
            <div class="col-1">
                <button @click="$router.push('/profile')" class="btn p-0 border-0 bg-transparent">
                    <img class="img-profile" src="@/assets/img/profile.jpg" alt="">
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
let backHandler = null;

export default {
    name: 'Navbar',
    props: {
        title: {
            type: String,
        },
        back: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (window.Capacitor && window.Capacitor.getPlatform() === 'android') {
            import('@capacitor/app').then(({ App }) => {
                backHandler = () => {
                    if (this.back) {
                        this.$router.back();
                    } else {
                        App.exitApp();
                    }
                };
                App.addListener('backButton', backHandler);
            });
        }
    },
    beforeUnmount() {
        if (backHandler) {
            import('@capacitor/app').then(({ App }) => {
                App.removeAllListeners('backButton');
            });
        }
    }
};
</script>

<style scoped>
.navbar-brand {
    font-family: 'Inter', sans-serif;
    color: #374856;
    font-size: 20px;
}

.img-profile {
    width: 35px;
    height: auto;
    border-radius: 32px;
}

.icon-left {
    width: 20px;
    height: auto;
}

.btn-link {
    margin-top: -7px !important;
}
</style>