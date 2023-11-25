const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            juguetes: [],
            selected: 'menor',
            productosOrdenados: [],
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
                // this.productosOrdenados= this.juguetes
                console.log(this.juguetes)
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
        },
        selec(event) {
            this.selected = event.target.value
            console.log("Seleccionado:", this.ordenSeleccionado)
            if (this.selected == "menor") {
                this.juguetes = this.juguetes.slice().sort((a, b) => a.precio - b.precio)
            }
            else if (this.selected == "mayor") {
                this.juguetes = this.juguetes.slice().sort((a, b) => b.precio - a.precio)
            }
            else if (this.selected == "alfabetico") {

                this.juguetes = this.juguetes.slice().sort((a, b) => a.producto.localeCompare(b.producto))
            }
            else {

                this.juguetes = this.juguetes
            }

        }

    },
})
app.mount("#app")