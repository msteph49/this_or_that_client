class Category {
    static all = []

    constructor(data) {
        this.data = data

        this.contructor.all.push(this)
    }

    static getCategories = () => {
        const categories = []
        this.renderIndex()
    }

    static renderIndex = () => {
        const main = document.getElementById("app")
        main.innerHTML = `<h3>Select a Category</h3>`
    }
}