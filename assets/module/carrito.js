const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            filtrados: [],
            carrito: [],
            subtotal: 0,
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
                for (let i = 0; i < this.filtrados.length; i++) {
                    this.filtrados[i].cantidad = 1
                }
                console.log(this.filtrados);
                this.subtotal = this.filtrados.reduce((subtotal, producto) => subtotal + producto.precio, 0)
            })
            .catch(error => console.error(error))
    },
    methods: {
        sumar(producto) {
            if (producto.cantidad <= producto.disponibles) {
                producto.cantidad++
                console.log(producto.cantidad)
                this.subtotal += producto.precio
            }
        },
        actualizarCarrito() {
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            this.filtrados = this.filtrados.filter(item => this.carrito.includes(item._id))
        },
        restar(producto) {
            if (producto.cantidad > 1) {
                producto.cantidad--
                this.subtotal -= producto.precio
            }
        },
        eliminarDelCarrito(producto) {
            this.carrito = this.carrito.filter(item => item != producto._id)
            console.log(this.carrito);
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            console.log("eliminar " + producto._id);
            this.filtrados = this.filtrados.filter(item => this.carrito.includes(item._id))
            this.subtotal = this.filtrados.reduce((subtotal, producto) => subtotal + producto.precio, 0)
        },
        calcularsubtotal(precio, cantidad) {
            const nuevoPrecio = cantidad * precio
            this.subtotal = this.filtrados.reduce((subtotal) => subtotal + nuevoPrecio, 0)
        },
        calcularEnvio() {
            if (this.subtotal >= 10000) {
                this.envio = 0;
                return 0 // Envío gratis si el subsubtotal es mayor o igual a 50
            } else {
                this.envio = 300;
                return 300 // Costo de envío de 10 para subsubtotales menores a 50
            }
        },
        moneda(valor) {
            return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        }
    },
})
app.mount("#app")