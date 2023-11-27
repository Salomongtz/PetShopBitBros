const url = `https://moviestack.onrender.com/api/petshop`
const { createApp } = Vue;

const opt = {
    data() {
        return {
            farmacos: [],
            filtrados: [],
            buscador: "",
            selected: "all",
            menuOpen: false,
            farmaco: "",
            verModal: false,
            verCompra: false,
            carrito: JSON.parse(localStorage.getItem("carrito")) || []
        }
    },

    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.farmacos = data.filter(item => item.categoria == "farmacia");
                this.filtrados = data.filter(item => item.categoria == "farmacia");
            })
            .catch(error => console.error(error));
    },

    methods: {
        agregarAlCarrito(producto) {
            if (!this.carrito.includes(producto)) {
                producto.cantidad = 1
                console.log(producto);
                this.carrito.push(producto._id)
            }
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        }
        , select(event) {
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

                this.filtrados = this.farmacos
            }
        },
        filtrarPorNombre(event) {
            this.buscador = event.target.value
            this.filter()
            console.log(this.buscador)
        },
        filter() {
            const filtrado = this.farmacos.filter(farmaco => farmaco.producto.toLowerCase().includes(this.buscador.toLowerCase()))
            this.filtrados = filtrado
            console.log(this.filtrados)
        }, mostrarModal(farmaco) {
            this.farmaco = farmaco
            this.verModal = true
        },
        cerrarModal() {
            this.farmaco = {}
            this.verModal = false
            this.verCompra = true
        }, comprar(farmaco) {
            this.verCompra = true
            this.verModal = false
            this.farmaco = farmaco
        }
    }
}

const app = createApp(opt)
app.mount("#app")
