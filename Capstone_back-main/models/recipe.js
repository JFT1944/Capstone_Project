"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Recipe{


// get a recipe by id
static async getRecipe(id){

    try {
        let recipe = await db.query(
            `SELECT * FROM recipes
            WHERE id = $1`,
            [id]
        )
        return recipe.rows[0]
    } catch (error) {
        return 'Bad Request'
    }
}

// get all recipes by username
static async getAllRecipe(username){
    //console.log(username)
    try {
        let recipe = await db.query(
            `SELECT * FROM recipes
            WHERE username = $1`,
            [username]
        )
        //console.log(recipe)
        return recipe.rows
    } catch (error) {
        return 'Bad Request'
    }
}

// create a new recipe => A recipe hold a name, multiple ingredients 
// and is stored with a username
static async create(name, ingredients, username){
    //console.log('in model')
   try {
    let recipe = await db.query(
        `INSERT INTO recipes
        (name, ingredients, username)
        VALUES ($1, $2, $3)
        RETURNING id, name, ingredients, username`,
        [name, ingredients, username]
    )
    //console.log(recipe.rows[0])
    return recipe.rows[0]
   } catch (error) {
    return 'Bad Request'
   }
    }

// update a recipe by id
static async update(id, name){
    //console.log('in model')
    let recipe = await db.query(
        `UPDATE recipes
        SET name = $2
        WHERE id = $1
        RETURNING id, name, ingredients, username`,
        [id, name]
    )
    //console.log(recipe.rows[0])
    return recipe.rows[0]
    }


// delete a recipe by id
static async delete(id){

    try {
        let recipe = await db.query(
            `DELETE FROM recipes
            WHERE id = $1`,
            [id]
        )
        return 'Deleted'
    } catch (error) {
        return 'Bad Request'
    }

    }




}


module.exports = Recipe;