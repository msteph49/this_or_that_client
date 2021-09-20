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
        console.log("Hello From Rendered Index")
    }
}