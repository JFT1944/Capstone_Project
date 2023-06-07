"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const ingredientHelper  = require('../helpers/ingredientParser')
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const e = require("express");



class Ingredient{

// create a new ingredient
static async create({name, unit, full_amount, available_amount, username}){
////console.log('***made it model***')
   try {
    if(!name || !unit || !full_amount || !available_amount || !username) return
    const result = await db.query(
        `INSERT INTO ingredients
         (name, unit, full_amount, available_amount, username)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, unit, full_amount, available_amount`,
      [
        name,
        unit,
        full_amount,
        available_amount,
        username
      ]);
  const ingredient = result.rows[0];

  ////console.log({res:ingredient})
return ingredient
   } catch (error) {
    return 'Bad Request'
   }
    
}
// ###############################################################
// takes an array of ingredients and adds it into the database
// ###############################################################
static async createAll({username, ingredients}){
    
    ////console.log([username, ingredients])

    let parsedIngredients = ingredientHelper.parser(ingredients)
    ////console.log({inModel:parsedIngredients})

    let JSONIngredients = await ingredientHelper.ZestfulApi(parsedIngredients)
    ////console.log(JSONIngredients)

    // let ingredientsReadyForDB = ingredientHelper.converter(JSONIngredients)
    let dbResponse = await ingredientHelper.sorter(username, JSONIngredients)


    
return dbResponse
    // return ingredientsReadyForDB

    return
}

// #################################################
// get all ingredients held by the user
// #################################################
static async getAll(username){
    ////console.log('model working')
    const result = await db.query(`
    SELECT  id, name, unit, full_amount, available_amount
    From ingredients
    WHERE username = $1 
    `, [username])

    // //console.log(result)
    let ingredient = result.rows
    ////console.log({ingredient:ingredient})

    return ingredient

}

// get a singular ingredient
static async get(iName, username){
//console.log(iName, username)
   try {
    const result = await db.query(
        `SELECT  id, name, unit, full_amount, available_amount
        FROM ingredients
        WHERE name = $1 username = $2`, [iName, username]
    )
    //console.log(result)
    let ingredient = result.rows[0]
    ////console.log(ingredient)

    return ingredient
   } catch (error) {
         return 'Bad Request'
   }
}


// get the ingredient by id
static async getID(id){

    const result = await db.query(
        `SELECT  id, name, unit, full_amount, available_amount
        FROM ingredients
        WHERE id = $1`, [id]
    )
    
    let ingredient = result.rows[0]
    //console.log({fifif:ingredient})
    ////console.log(ingredient)

    return ingredient
}


// Update the individual ingredient
static async update(data){
    ////console.log('in-model')
    let available_amount;
    let full_amount;
//console.log({data:data})
    ////console.log({formData:data})
    let {id} = data
    if(data.available_amount.available_amount || data.available_amount.full_amount){
        //console.log('whabadabadoo')
        available_amount = data.available_amount.available_amount
        full_amount = data.available_amount.full_amount
        
    } else{
    // let {available_amount, full_amount} = data.available_amount
        available_amount = data.available_amount
    }
    
    ////console.log({id:id, available_amount:available_amount, full_amount:full_amount})
    let setArr = []
    let updates = []
    let counter = 0
    if(available_amount){
        counter++
        setArr.push(available_amount)
        updates.push(`available_amount = $${counter}`)
    }
    if(full_amount){
        counter++
        setArr.push(full_amount)
        if(updates.length === 1){
            updates.push(',')
            updates.push(`full_amount = $${counter}`)
            
        } else {
            updates.push(`full_amount = $${counter}`)
        }
    }
    if(id){
        counter++
        setArr.push(id)
    }



    

    //console.log({ghiffff:{updates:updates, counter:counter, setArr:setArr}})
    //console.log('model working')
    //console.log([counter, id, available_amount, full_amount])
    //console.log([id, available_amount])
    //console.log()
    const result = await db.query(
        `UPDATE  ingredients
         SET ${updates.join('')}
         WHERE id = $${counter}         
         RETURNING id, name, unit, full_amount, available_amount`,
        setArr
      );
      //console.log({result:result})
  const ingredient = result.rows[0];
      //console.log({ingredient:ingredient})

      return ingredient

}

// delete the ingredient from the database
static remove(id){

    const result = db.query(
        `DELETE FROM ingredients
         WHERE id = $1`, [id]
    )
    return 'Deleted'


}





}


module.exports = Ingredient