const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            juguetes: [],
            selected:'menor',
            productosOrdenados:[],
        }
    },
    beforeCreated() {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.juguetes = data.filter(item => item.categoria == "jugueteria")
                this.productosOrdenados= this.juguetes
                console.log(this.juguetes)
            })
            .catch(error => console.error(error))
    },
    
    methods:{
            selec(event){
                this.selected = event.target.value
                console.log("Seleccionado:", this.ordenSeleccionado)
              if(selected="menor"){
                   this.productosOrdenados= this.productosOrdenados.slice().sort((a, b) => a.precio - b.precio)}
                else if (selected="mayor"){
                   this.productosOrdenados= this.productosOrdenados.slice().sort((a, b) => b.precio - a.precio)}
                   else if(selected="alfabetico"){
             
                   this.productosOrdenados= this.productosOrdenados.slice().sort((a, b) => a.nombre.localeCompare(b.nombre))}
                   else{
                
                   this.productosOrdenados= this.productosOrdenados}
                 
                }
        
    },
})
app.mount("#app")