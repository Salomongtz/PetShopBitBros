const { createApp } = Vue
const optionsVue = {
    el: '#app',
    data() {
        return {
            images: [
                './assets/images/farmacia.png',
                './assets/images/jugueteria.png',
                './assets/images/contacto.png',
            ],
            currentIndex: 0,
        };
    },
}

const app = createApp(optionsVue)
app.mount('#app')