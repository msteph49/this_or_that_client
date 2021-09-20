class Category {
    static all = []

    constructor(data) {
        this.data = data
        
        // console.log(this.constructor.all.push(this))
        this.constructor.all.push(this)
    }

    static getCategories = () => {
        const categories = [{"title": "Metal or Rock n' Roll"}]
        categories.forEach((category) => {new Category(category)})
        this.renderIndex()
    }

    static renderIndex = () => {
        const main = document.getElementById("app")
        main.innerHTML = `<h3>Select a Category</h3>`
        this.all.map((category) => { main.innerHTML += category.data["title"] })
        console.log(this.all)

    }


}