const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            filtrados: [],
            carrito: [],
            total: 0,
            envio: 0,
            menuOpen: false,
        }
    },
    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.carrito = JSON.parse(localStorage.getItem("carrito")) || []
                this.filtrados = data.filter(item => this.carrito.includes(item._id))

                console.log(this.filtrados);
                this.total = this.filtrados.reduce((total, producto) => total + producto.precio, 0)
            })
            .catch(error => console.error(error))
    },
    methods: {
        sumar(producto) {
            if (producto.cantidad <= producto.disponibles) {
                producto.cantidad++
                this.total += producto.precio
            }
        },
        restar(producto) {
            if (producto.cantidad > 1) {
                producto.cantidad--
                this.total -= producto.precio
            }
        },
        eliminarDelCarrito(producto) {
            this.carrito = this.carrito.filter(item => item != producto._id)
            console.log(this.carrito);
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            console.log("eliminar " + producto._id);
            this.filtrados = this.filtrados.filter(item => this.carrito.includes(item._id))
            this.total = this.filtrados.reduce((total, producto) => total + producto.precio, 0)
        },
        calcularTotal(precio, cantidad) {
            const nuevoPrecio = cantidad * precio
            this.total = this.filtrados.reduce((total) => total + nuevoPrecio, 0)
        },
        moneda(valor) {
            return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        }
    },
})
app.mount("#app")