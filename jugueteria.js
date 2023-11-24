const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            juguetes: [],
            verModal: false,
            juguete: {}
        }
    },
    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.juguetes = data.filter(item => item.categoria == "jugueteria")
            })
            .catch(error => console.error(error))
    },
    methods: {
        mostrarModal(juguete) {
            this.juguete = juguete
            this.verModal = true
        },
        cerrarModal() {
            this.juguete = {}
            this.verModal = false
        }
    },
})
app.mount("#app")