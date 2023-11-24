const { createApp } = Vue
const optionsVue = {
    data() {

    }, beforeCreate() {
        console.log('beforeCreate');
        fetch('https://moviestack.onrender.com/api/petshop')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }
}

const app = createApp(optionsVue)
app.mount('#app')