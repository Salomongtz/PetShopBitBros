const url = `https://moviestack.onrender.com/api/petshop`
const { createApp } = Vue;

const opt = {
    data() {
<<<<<<< HEAD
      return {
       farmacos: [],
       filtered:[],
       buscador:"",
       selected:'menor',
       verModal: false,
       farmaco:[],
       filtrados:[],
    }
},
  created() {
        fetch(url)
        .then(response => response.json())
        .then((data) => {
           console.log(data)
            this.farmacos = data.filter(item => item.categoria == "farmacia");
            console.log(this.farmacos)
            this.filtrados= data.filter(item => item.categoria == "farmacia")
        })
    .catch(error => console.error(error));
},
methods: {
    filtrarPorNombre(event){
        this.buscador=event.target.value
        this.filter()   
    },
    filter(){
        const filtrados=this.farmacos.filter(farmaco=> farmaco.producto.toLowerCase().includes(this.buscador.toLowerCase()))
        this.filtered=filtrados
    },
    select(event){
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
        mostrarModal(farmaco) {
=======
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
        agregarAlCarrito(farmaco) {
            this.carrito.push(farmaco)
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
>>>>>>> 56761e2a758aa43355cd0dbb5be80ec9f5adb4b5
            this.farmaco = farmaco
            this.verModal = true
        },
        cerrarModal() {
            this.farmaco = {}
            this.verModal = false
<<<<<<< HEAD
        }
},
=======
        },comprar() {
            this.verCompra = true
        }
    }
>>>>>>> 56761e2a758aa43355cd0dbb5be80ec9f5adb4b5
}

const app = createApp(opt)
app.mount("#app")
