const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            filtrados: [],
            carrito: [],
            total: 0,
            envio: 0,
            
        }
    },
    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.carrito = JSON.parse(localStorage.getItem("carrito")) || []
                this.filtrados = data.filter(item => this.carrito.includes(item._id))
                this.total = this.filtrados.reduce((total, producto) => total + producto.precio, 0)
            })
            .catch(error => console.error(error))
    },
    methods: {
        agregarAlCarrito(producto) {
            this.carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },
        eliminarDelCarrito(producto) {
            this.carrito = this.carrito.filter(producto => producto !== producto._id)
            console.log(this.carrito);
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            console.log("eliminar " + producto._id);
            this.filtrados = this.filtrados.filter(item => this.carrito.includes(item._id))
            this.total = this.filtrados.reduce((total, producto) => total + producto.precio, 0)
        },
        actualizarCarrito(producto, cantidad) {
            this.total = this.filtrados.reduce((total, producto) => total + producto.precio, 0)
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
        },
        moneda(valor) {
            return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        }
    }, computed: {
        total() { }
    }
})
app.mount("#app")