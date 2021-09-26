class Category {
    static all = []

    constructor(data) {
        this.data = data
        
        // console.log(this.constructor.all.push(this))
        this.constructor.all.push(this)
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        var newCategory = {
            title: e.target.title.value,
            choices_attributes: [
                {title: e.target["choices_attributes[0][title]"].value},
                {title: e.target["choices_attributes[1][title]"].value}
            ]
        }

        api.createCategory({ category: newCategory }).then(category => {
           this.all.push(new Category(category))
        })

        e.target.reset()

        this.renderIndex() // react to changes
    }

    static getCategories = () => {
        // const categories = [{"title": "Metal or Rock n' Roll","image_url": "https://picsum.photos/200/300","id": 1},
        // {"title": "R&B","image_url": "https://picsum.photos/200/300","id": 2}]
        api.fetchCategories().then(
            (categories) => {
                categories.forEach((category) => {new Category(category)})
        
                this.renderIndex()
            }
        )
        
    }

    static find = (id) => this.all.find((category) => category.data["id"] == id)


    static handleClick(event){
        event.preventDefault()

        const id = event.target.closest(".card").dataset.id
        console.log(this.find(id))

        this.find(id).renderShow()
    }
    static renderIndex = () => {
        const main = document.getElementById("app")
        main.innerHTML = `<h3>Select a Category</h3>`
        
        const categoryContainer = document.createElement("div")
        categoryContainer.id = "category-container"
        const row = document.createElement("div")
        row.classList.add("row")

        this.all.map((category) => {
            const col = document.createElement("div")
            col.classList.add("col")
            col.innerHTML += `
            <div class="card" data-id="${category.data["id"]}">
                <img src="${category.data["image_url"]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${category.data["title"]}</h5>
                    <p> popularity: ${category.data.popularity}</p>
                    </div>
            </div>
            `

            row.append(col)

        })


        
        categoryContainer.append(row)
        console.log(this.all)
        main.append(categoryContainer)


        categoryContainer.addEventListener("click", (event) => this.handleClick(event))
    }

    static renderForm(){
        const form = document.getElementById("category_form")

        form.innerHTML = `
            <form>
                <label>Category:</label><br>
                <input type="text" name="title"><br>
                <label>Option 1:</label><br>
                <input type="text" name="choices_attributes[0][title]"><br>
                <label>Option 2:</label><br>
                <input type="text" name="choices_attributes[1][title]"><br>
                <input type="submit" value="Create Category"><br>
            </form>`
        

        form.querySelector("form").addEventListener("submit", this.handleSubmit)
    }
    renderShow() {
        const main = document.getElementById("app")

        const choicesContainer = document.createElement("div")
        choicesContainer.id = "choices-container"
        main.innerHTML =   `<h3>${this.data.title}</h3>`
        const linkBack = document.createElement("button")
        linkBack.textContent = "Go Back"
        linkBack.onclick = () => this.constructor.renderIndex()
        main.appendChild(linkBack)
        var choices = []

        this.data["choices"].forEach((choice) => {
            choices.push(new Choice(choice))
        })
        
        choices.forEach((choice) => {
            choicesContainer.innerHTML += choice.render()
        
        })
        main.appendChild(choicesContainer)
        choicesContainer.addEventListener("click", (event) => {
            const id = event.target.closest(".card").dataset.id
            console.log(id)
            choices.find((choice) => choice.data["id"] == id).vote(this.data.id)
        this.constructor.renderIndex()
        })

    }


}