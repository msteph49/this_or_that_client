class ApiService {
    constructor(api){
        this.api = api
    }

    fetchCategories = () => fetch(`${this.api}/categories`).then((response) => response.json())
    
}