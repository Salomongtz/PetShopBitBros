const url= "https://moviestack.onrender.com/api/petshop"

const{createApp}=Vue
const optionsVue={
data(){
return {jugueteria:[],}
},
beforeCreate(){
 fetch(url)
 .then(response => response.json())
 .then(data => {
this.jugueteria = data
console.log(data)
})
.catch(error=> console.error(error))
},
methods(){
    
},
}
const app = createApp(optionsVue)
app.mount('#app') 