// const axios = require('axios')
import axios from "axios"


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

console.log(localStorage)

class DispensaApi{
// token = ''

    // generic request function
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${localStorage.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
            console.log(headers)
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }




// ####################################
// User Api Function
// ####################################


// signup function
static async createUser(data){
console.log({data:data})
try {
    let res = await this.request('users', data, 'post')
    console.log(res)
    return res
} catch (error) {
    console.log(error)
    // return 'Error'
}


}

// login function
static async login(username, password){

console.log([username, password])
try {
    console.log({username:username, password:password})
    let res = await this.request(`auth/token`, {username:username, password:password}, 'post')
    console.log(res)
    return res
} catch (error) {
    console.log(error)
}

}

// Tie up the usernames.

// get user informagtion function
static async getUser(username){
    console.log('inside api helper and getusers')

    try {
        let res = await this.request(`users/${username}`)
        console.log(res)
        // return res.users
    } catch (err) {
        console.log(err)
    }
}

// get all users

static async getUsers(){
    console.log('inside api helper and getusers')

    try {
        let res = await this.request('users')
        console.log(res)
        return res.users
    } catch (err) {
        console.log(err)
    }


    
}



// ####################################
// Ingredient Api Function
// ####################################

// get single ingredient using username and ingredient name
static async getIngredient(username, ingredient){
console.log({username:username, ingredients:ingredient})
    try {
        let res = await this.request(`ingredients/${username}/${ingredient}`)
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }

}

// get all ingredients using username
static async getAllIngredients(username){
console.log(username)
try {
    console.log({localStorage:localStorage.token})
    let res = await this.request(`ingredients/${username}`)
console.log(res)
return res
} catch (error) {
    console.log(error)
}

}

// create ingredient using username and ingredient data
static async createIngredient(data){
    console.log(data)
try {
    let res = await this.request('ingredients', data, 'post')
console.log(res)
} catch (err) {
    console.log(err)
}

}

// create all ingredients using username and ingredient data
static async createAllIngredients(user, data){
console.log(data)
try {
    let res = await this.request('ingredients/full-recipe', {ingredients:data, username:user.username}, 'post')
    console.log(res)
    return data
} catch (error) {
    console.log(error)
}
}


// delete ingredient using ingredient id
static async removeIngredient(id){

    console.log({id:id})
    try {
        let res = this.request(`ingredients/${id}`, {}, 'delete')
        console.log(res)
        return res


    } catch (error) {
        console.log(error)
    }

}

// update ingredient using ingredient id and ingredient data
static async updateIngredient(id, data){
    console.log({id:id})
    console.log({data:data})
   try {
    let res = await this.request('ingredients', {id:id, available_amount:data}, 'patch' )
    console.log(res)

    return res
   } catch (error) {
    console.log(error)
   }
}



// ******************************************
// Recipe Api
// ******************************************

// get all recipes using recipe id
static async getAllRecipes(username){
console.log(username)

try {
    let res = await this.request(`recipes/all/${username}`)
    console.log(res)
    return res
} catch (error) {
    console.log(error)
}

}

// create recipe using username, recipe data, and recipe name
static async createRecipe(username, recipe, name){
    
    console.log({Data:[username, recipe, name]})
    console.log({Data:{name:name, ingredients:recipe, username:username}})
    let res = await this.request('recipes', {name:name, ingredients:recipe, username:username}, 'post')
    console.log(res)

}

// delete recipe using recipe id
static async deleteRecipe(id){
    console.log({Data:[id]})

    let res = await this.request(`recipes/${id}`,{}, 'delete')
    console.log(res)

}



}
DispensaApi.token = ''


export default DispensaApi