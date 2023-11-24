const url = `https://moviestack.onrender.com/api/petshop`
const { createApp } = Vue;

const opt = {
    data() {
      return {
       
       
      };
    }
},

beforeCreate() {
fetch(url)
     
  
  }
  




















const app = createApp(opt);
app.mount("#app");
