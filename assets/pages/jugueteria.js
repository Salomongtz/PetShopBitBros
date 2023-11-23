const url= "https://moviestack.onrender.com/api/petshop"

const{createApp}=Vue
const optionsVue={
data(){
},

beforeCreate(){
 fetch(url)
 .then(response => response.json())
 .then(data => {
this.productos = data
console.log(this.productos)
})
},
}
const app = createApp(optionsVue)
app.mount('#app')