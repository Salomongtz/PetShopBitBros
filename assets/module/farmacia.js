const url = `https://moviestack.onrender.com/api/petshop`
const { createApp } = Vue;

const opt = {
    data() {
      return {
       farmacos: [],
       
      }
    },
    
    beforeCreate() {
        fetch(url)
        .then(response => response.json())
        .then((data) => {
           console.log(data)
            this.farmacos = data.filter(item => item.categoria == "farmacia");
            console.log(this.farmacos)
        })
    .catch(error => console.error(error));
},

methods: {
    filter() {
        this.filtered = this.farmacos.filter(farmaco => farmaco.producto.toLowerCase().includes(this.search.toLowerCase()))
    }
},

}

const app = createApp(opt)
app.mount("#app")
