const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            juguetes: [],
            selected: 'menor',
            productosOrdenados: [],
            verModal: false,
            juguete: {},
            buscador: '',
            filtrados: [],
            menuOpen: false,
            verCompra:false,
            carrito: JSON.parse(localStorage.getItem("carrito")) || []
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
                this.filtrados = data.filter(item => item.categoria == "jugueteria")



            })
            .catch(error => console.error(error))
    },

    methods: {
        agregarAlCarrito(producto) {
            this.carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },
        mostrarModal(juguete) {
            this.juguete = juguete
            this.verModal = true
        },
        cerrarModal() {
            this.juguete = {}
            this.verModal = false
        },
        comprar(){
            this.verCompra = true
        },
        selec(event) {
            this.selected = event.target.value
            console.log("Seleccionado:", this.ordenSeleccionado)
            if (this.selected == "menor") {
                this.filtrados = this.filtrados.slice().sort((a, b) => a.precio - b.precio)
            }
            else if (this.selected == "mayor") {
                this.filtrados = this.filtrados.slice().sort((a, b) => b.precio - a.precio)
            }
            else if (this.selected == "alfabetico") {

                this.filtrados = this.filtrados.slice().sort((a, b) => a.producto.localeCompare(b.producto))
            }
            else {

                this.filtrados = this.juguetes
            }

        },
        filtrarPorNombre(event) {
            this.buscador = event.target.value
            this.filter()
            console.log(this.buscador)
        },
        filter() {
            const filtrado = this.juguetes.filter(juguete => juguete.producto.toLowerCase().includes(this.buscador.toLowerCase()))
            this.filtrados = filtrado
            console.log(this.filtrados)
        }

    },
})
app.mount("#app")