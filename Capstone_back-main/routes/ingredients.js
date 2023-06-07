"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureCorrectUser} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
// const UInser = require("../models/user");
const Ingredient = require("../models/ingredient");
const { createToken } = require("../helpers/tokens");
const db = require("../db");
const ingredientNewSchema = require("../schemas/ingredientNew.json");
const ingredientUpdateSchema = require("../schemas/ingredientUpdate.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

// #################################################################
// Adding an Ingredient
// accepts {name, unit, full_amount, available_amount, username}
// #################################################################

router.post('/', ensureCorrectUser, async function (req, res, next){
    try {
        const validator = jsonschema.validate(req.body, ingredientNewSchema);
        //console.log(validator)
        if (!validator.valid) {
        //console.log('validator not valid')

      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

////console.log('route working')
////console.log(req.body)
const ingredient = await Ingredient.create(req.body)
////console.log(ingredient)



    return res.status(201).send(ingredient)
    } catch (error) {
        return res.status(400).send(error)
    }
})

// #################################################################
// Adding all Ingredients
// accepts {username, ingredients} => ingredients is a string of objects
// #################################################################
router.post('/full-recipe',ensureCorrectUser, async function (req, res, next){

////console.log('route working')
////console.log({BODY:req.body})
const ingredient = await Ingredient.createAll(req.body)
////console.log(ingredient)



    return res.send(ingredient)
})

// #################################################################
// Getting all ingredients for a user
// returns {id, name, unit, full_amount, available_amount, username}
// #################################################################
router.get('/:username', async function(req, res, next){
    let {username} = req.params
    ////console.log('route working')
    ////console.log(username)

    const result = await Ingredient.getAll(username)


    ////console.log(result)
    res.send(result)


})




// #################################################################
// Getting the single ingredient
// returns {id, name, unit, full_amount, available_amount, username}
// #################################################################
// router.get('/:username/:iname', async function(req, res, next){
// let {username, iname} = req.params
// console.log([username, iname])

// const result = await Ingredient.get(iname, username)
// console.log(result)

// return res.send(result)

// })
router.get('/:username/:id', async function(req, res, next){
let {id} = req.params
// console.log([username, iname])
//console.log({id:id})
const result = await Ingredient.getID(id)
//console.log(result)

return res.send(result)

})

// #################################################################
//updating the ingredient - specifically the amount
// accepts {available_amount, username, full_amount}
// #################################################################
router.patch('/', ensureCorrectUser, async function (req, res, next){



try {
    const ingredient = await Ingredient.update(req.body)
    return res.send(ingredient)
} catch (error) {
    return res.status(400).send(error)
}
//console.log(ingredient)



    
})

// #################################################################
// Deleting the ingredient
// accepts {id}
// return {message: 'deleted'}
// #################################################################

router.delete('/:id', async function (req, res, next){
    //console.log('route working')
    //console.log(req.params)
try {
    const result = await Ingredient.remove(req.params.id)
    //console.log(result)

    return res.send(result)
} catch (error) {
    return res.status(401).send('An error occured)')
}



})





module.exports = router