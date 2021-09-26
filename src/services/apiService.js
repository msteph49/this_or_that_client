class ApiService {
    constructor(api){
        this.api = api
    }

    fetchCategories = () => fetch(`${this.api}/categories`).then((response) => response.json())
    
    makeVote = (id, choice_id) => {
        return fetch(`${this.api}/categories/${id}/vote`, {
            method: "POST",
            body: JSON.stringify({choice_id: choice_id}), 
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())

    }

    fetchVotes = (id) => fetch(`${this.api}/choices/${id}/votes`).then((response) => response.json())

    createCategory = (data) => {
        return fetch(`${this.api}/categories`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
    }
}