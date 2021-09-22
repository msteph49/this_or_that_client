class Category {
    static all = []

    constructor(data) {
        this.data = data
        
        // console.log(this.constructor.all.push(this))
        this.constructor.all.push(this)
    }

    static getCategories = () => {
        const categories = [{"title": "Metal or Rock n' Roll","image_url": "https://picsum.photos/200/300"}, {"title": "R&B","image_url": "https://picsum.photos/200/300"}]
        categories.forEach((category) => {new Category(category)})
        this.renderIndex()
    }

    static renderIndex = () => {
        const main = document.getElementById("app")
        main.innerHTML = `<h3>Select a Category</h3>`
        this.all.map((category) => {
            main.innerHTML += `
            <div class="card">
                <img src="${category.data["image_url"]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${category.data["title"]}</h5>
                    </div>
            </div>
            `
        })
        console.log(this.all)

    }


}