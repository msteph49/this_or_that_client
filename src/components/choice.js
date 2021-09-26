class Choice{
    constructor(data){
        this.data = data

        
    }

    render(){
        return `
            <div class="card" data-id="${this.data["id"]}">
                <img src="${this.data["image_url"]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.data["title"]}</h5>
                    </div>
            </div>
            `

    }

    vote(category_id) {
        api.makeVote(category_id, this.data.id).then(() => {
            alert("You Voted!")
        })
    }

}