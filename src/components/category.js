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
        const newCategory = {
            title: e.target.title.value,
            image_url: e.target.image_url.value,
            choices_attributes: [
                { 
                    title: e.target["choices_attributes[0][title]"].value,
                    image_url: e.target["choices_attributes[0][image_url]"].value
                },
                {
                    title: e.target["choices_attributes[1][title]"].value,
                    image_url: e.target["choices_attributes[1][image_url]"].value
                },
            ]
        }   

       
        api.createCategory({ category: newCategory }).then((json) => {
            if (typeof json === "array"){
                // error 
                alert(json)
                return
            }
            const category = new Category(json)
 
            const categoriesContainer = document.getElementById("category-container")
            categoriesContainer.firstChild.appendChild(category.renderCard())
         })

        
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


    renderCard() {
        const col = document.createElement("div")
        col.classList.add("col")
        const card = document.createElement("div")
        card.classList.add("card")
        card.dataset.id = this.data.id
        card.innerHTML += `
                <img src="${this.data.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.data.title}</h5>
                    <p> popularity: ${this.data.popularity}</p>
                    </div>
                `
            
        // const deleteButton = document.createElement("button")
        // deleteButton.classList.add("btn")
        // deleteButton.textContent = "Delete"
        // deleteButton.onclick = () => this.delete

        // card.appendChild(deleteButton)
        col.appendChild(card)


        return col
    }

    static renderIndex = () => {
        const main = document.getElementById("app")
        main.innerHTML = `<h3>Select a Category</h3>`
        
        const categoryContainer = document.createElement("div")
        categoryContainer.id = "category-container"
        const row = document.createElement("div")
        row.classList.add("row")

    
        this.all.forEach((category) => { row.append(category.renderCard()) })
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
                <label>Category Image:</label><br>
                <input type="text" name="image_url"><br>
                <label>Option 1:</label><br>
                <input type="text" name="choices_attributes[0][title]"><br>
                <label>Option 1 Image URL:</label><br>
                <input type="text" name="choices_attributes[0][image_url]"><br>
                <label>Option 2:</label><br>
                <input type="text" name="choices_attributes[1][title]"><br>
                <label>Option 2 Image URL:</label><br>
                <input type="text" name="choices_attributes[1][image_url]"><br>
                <input type="submit" value="Create Category"><br>
            </form>
        `


        form.querySelector("form").addEventListener("submit", (event) => this.handleSubmit(event) )
    }

    renderShow() {
        const main = document.getElementById("app")

        const choicesContainer = document.createElement("div")
        choicesContainer.id = "choices-container"
        main.innerHTML =   `<h3>${this.data.title}</h3>`
        const linkBack = document.createElement("button")
        linkBack.textContent = "Go Back"
        linkBack.classList.add("btn")
        linkBack.onclick = () => this.constructor.renderIndex()
        main.appendChild(linkBack)

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.onclick = () => this.delete()
        deleteButton.classList.add("btn")
        main.appendChild(deleteButton)
        
        
        const choices = this.data["choices"].map((choice) => new Choice(choice))


    
        
        choices.forEach((choice) => {
            choicesContainer.innerHTML += choice.render()
        
        })
        main.appendChild(choicesContainer)
        choicesContainer.addEventListener("click", (event) => {
            const id = event.target.closest(".card").dataset.id
            console.log(id)
            const choice = choices.find((choice) => choice.data["id"] == id)
            const choiceIndex = this.data.choices.findIndex((choice) => choice["id"] == id)
            
            choice.vote(this.data.id)
            this.data.popularity += 1
            this.data.choices[choiceIndex].popularity += 1
            console.log(this.data.choices[choiceIndex])
        this.constructor.renderIndex()
        })

    }

    delete() {
        console.log("deleting")

        

        api.deleteCategory(this.data.id).then(
            (response) => {
                console.log(response.status)
                if (response.status === 204){
                    alert("Deleted!")

                    let index = this.constructor.all.findIndex(
                        (category) => (category.id === this.data.id)
                    )

                    this.constructor.all.splice(index, 1)


                    this.constructor.renderIndex()
                }
            }
        )
    }


}