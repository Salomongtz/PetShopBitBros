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
            cantidad:1

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
            this.carrito = this.carrito.filter(item => item != producto._id)
            console.log(this.carrito);
            localStorage.setItem("carrito", JSON.stringify(this.carrito))
            console.log("eliminar " + producto._id);
            this.filtrados = this.filtrados.filter(item => this.carrito.includes(item._id))
            this.total = this.filtrados.reduce((total, producto) => total + producto.precio, 0)
        },
        actualizarCarrito(producto, cantidad) {
            const productoEnCarrito = this.carrito.find(item => item.id === producto.id);

            // Si el producto no está en el carrito, agrégalo
            if (!productoEnCarrito) {
                this.carrito.push({
                    id: producto.id,
                    nombre: producto.producto,
                    precio: producto.precio,
                    cantidad: nuevaCantidad,
                });
            } else {
                // Si el producto ya está en el carrito, actualiza la cantidad
                productoEnCarrito.cantidad = nuevaCantidad;
            }

            // Puedes realizar otras acciones según tus necesidades, como recalcular el total
            this.calcularTotal();
        },
        moneda(valor) {
            return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        }
    },
})
app.mount("#app")