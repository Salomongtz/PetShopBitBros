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
    
    methods:{
            selec(event){
                this.selected = event.target.value
                console.log("Seleccionado:", this.ordenSeleccionado)
              if(this.selected=="menor"){
                   this.juguetes= this.juguetes.slice().sort((a, b) => a.precio - b.precio)}
                else if (this.selected=="mayor"){
                   this.juguetes= this.juguetes.slice().sort((a, b) => b.precio - a.precio)}
                   else if(this.selected=="alfabetico"){
             
                   this.juguetes= this.juguetes.slice().sort((a, b) => a.nombre.localeCompare(b.nombre))}
                   else{
                
                   this.juguetes= this.juguetes}
                 
                }
        
    },
})
app.mount("#app")