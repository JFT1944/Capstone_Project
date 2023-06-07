# Capstone_back

**About**
Dispensa.io is an application built on react and node.js to expedite the grocery planning and shopping process. 
- The main use of this site is to take an ingredient and add it to the database referred to the "pantry". 
If an ingredient already exists in the database, it will subtract the amount of ingredient it is planning to use from your pantry. 
If your available amount hits 0, it will be added to the shopping list. 

################################################################################################################################################

**Application Name: Dispensa.io:**
**-Front_End**
The front end is currently deployed with Surge.
Link: https://dispensa1.surge.sh/

**-Back_End**
The backend is currently deployed with heroku.
Link: https://dispensa-backend.herokuapp.com

################################################################################################################################################

**Implemented Features:**
- Single ingredient form
    - This form allows you to add a single ingredient to you pantry
        - giving it a name, available amount, total amount, unit. 

- Recipe form
    - This form allows you to add a recipe to your database, which can be used for later
        - this form has two purposes:
            - one: save a recipe to the database with {recipe name, ingredients, unit}
                - you must add a name to the recipe to save it as a recipe into the database. 
            
            - two: add the ingredients to the database all at once. 
                - this allows for someone to copy and past ingredient list from a recipe page and paste it straight into their pantry. 
                    - this minimizes the need to check the pantry and add up what ingredients they need. 

- Recipe page: The recipe page display the saved recipes and gives the user the option to add the recipes directly into the database instead of copy and pasting the recipe
    - **to efficiency fix would be to save the already parsed ingredient instead of just the string**.

- Pantry page: 
    - The pantry page displays all of the ingredients.
    - It also allows for every ingredient to be audited
        - that way the user can accurately tell the amount of ingredients they have. 

- Shopping list:
    - This is the final page of the site. 
    This holds all of the ingredients that do have less than 0 available amount.
        - otherwise known as empty

################################################################################################################################################

**Tests**
For the front_end you can check all tests by running npm test.
-> noted to have the full application test to run the server must be running. 

For the back_end you can check all tests by running Jest.

################################################################################################################################################

**Standard Flow**
The standard flow is as follows:
1. login or signup to start an account. 
2. Either add a single ingredient or find a recipe's list on ingredients and add them to the full recipe. 
3. Audit the amount that you have in your pantry. -> adjusting for available amount and total amount. 
4. Then Go Shopping! While you shop you can check off the items you have received. 
5. For now, your pantry is up to date, letting you know what you could potentially cook or what you may need. 

################################################################################################################################################


**API Used: **
https://zestfuldata.com/ => Api to parse ingredients

Explained: Zestful expedited the process of the assigment by taking in information in the form of an array of strings and returning nicely parsed JSON that is ready for the database. 

################################################################################################################################################

**TECH STACK**

Front_End:
- REACT
- HTML, CSS, JS, AXIOS

Back_End:
- Node.Js
- Postgres, Express, Axios, Bcrypt


