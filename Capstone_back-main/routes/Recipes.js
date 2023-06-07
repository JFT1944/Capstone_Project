const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureCorrectUser} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
// const UInser = require("../models/user");
const Ingredient = require("../models/recipe");
const { createToken } = require("../helpers/tokens");
const db = require("../db");
const Recipe = require("../models/recipe");
const recipeNewSchema = require("../schemas/recipeNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();



// ################################################################# 
// Getting a recipe by id
// returns {id, name, ingredients}
// #################################################################
router.get('/:id', async function(req, res, next){
    //////console.log('route working')
    let {id} = req.params
    //////console.log(id)
    let result = await Recipe.getRecipe(id)

    //////console.log(result)
    res.send(result)
    
})

// #################################################################
// Getting all recipes for a user
// returns all recipes with {id, name, ingredients}
// #################################################################
router.get('/all/:username', async function(req, res, next){
    //////console.log('route working')
    let {username} = req.params
    //////console.log(username)
    let result = await Recipe.getAllRecipe(username)

    //////console.log(result)
    res.send(result)
    
})

// #################################################################
// Adding an Recipe
// accepts {name, ingredients, username}
// returns {id, name, ingredients}
// #################################################################
router.post('/',ensureCorrectUser, async function (req, res, next){

    const validator = jsonschema.validate(req.body, recipeNewSchema);
    if (!validator.valid) {
        ////console.log('validator not valid')
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }


    ////console.log({BODY:req.body})

    let {name, ingredients, username} = req.body
    // ////console.log(Recipe) 
    let result = await Recipe.create(name, ingredients, username)
    ////console.log(result)
    res.status(201).send(result)

})

// #################################################################
// Updating a recipe
// accepts {id, recipe name}
// returns {id, name, ingredients}
// #################################################################

router.patch('/:id',ensureCorrectUser, async function (req, res, next){
    ////console.log({BODY:req.body})
    let result = await Recipe.update(req.params.id, req.body.name)
    ////console.log(result)

    return res.status(201).send(result)

})

// #################################################################
// Deleting a recipe
// accepts {id}
// #################################################################
router.delete('/:id', async function (req, res, next){
    ////console.log({BODY:req.body})
    let result = await Recipe.delete(req.params.id)
    ////console.log(result)

    return res.status(201).send(result)

})




module.exports = router;