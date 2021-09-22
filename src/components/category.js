class Category {
    static all = []

    constructor(data) {
        this.data = data
        
        // console.log(this.constructor.all.push(this))
        this.constructor.all.push(this)
    }

    static getCategories = () => {
        const categories = [{"title": "Metal or Rock n' Roll"}, {"title": "R&B"}]
        categories.forEach((category) => {new Category(category)})
        this.renderIndex()
    }

    static renderIndex = () => {
        const main = document.getElementById("app")
        main.innerHTML = `<h3>Select a Category</h3>`
        this.all.map((category) => {
            main.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${category.data["title"]}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `
        })
        console.log(this.all)

    }


}