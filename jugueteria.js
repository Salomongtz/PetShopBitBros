const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/petshop"

const app = createApp({
    data() {
        return {
            juguetes: [],
        }
    },
    beforeCreate() {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.juguetes = data.filter(item => item.categoria == "jugueteria")
            })
            .catch(error => console.error(error))
    },
    methods: {
        filter() {
            this.filtered = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase()) && (this.genre == "all" || movie.genres.includes(this.genre)))
        }
    },
})
app.mount("#app")