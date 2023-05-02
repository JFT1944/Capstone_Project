**Capstone proposal Ideas**

**- Recipe / pantry / shopping list api (Can use Zestful API to parse)**
    - Concept: The user can add ingredient list from a recipe in their input page
    - then the list will be parsed out all ingredients with amounts and saved to their account in their “pantry”.
    - Every time a new list of ingredients are added into the site, the api will either, 
        - Add the new ingredient into the pantry and ask if they have it / or needs to be bought
        - Add it to the negative amount and tell the user it should be bought
        - Or subtract it from the amount available.

    If it needs to be bought, it will be added to the shopping list
        - When you check it off that it’s bought, it will refill your item in the pantry.
    - 
    - The shopping list will pull prices from the target api (or another api) to have estimated prices and subtotal of the trip.
- Database tables could be: user, ingredient table, pantry (cross of user and ingredient)


- **Random Recipe Chooser (https://www.themealdb.com/api.php)**
    - Concept: The user signs up for an account and sets their preferences for meals they like,
    - Then they choose how many meals they want, it then supplies a shopping list and sends a text message around dinner time with the ingredients, and step by step instructions for the recipe
    - 


**- Simply an app that send a riddle by text then responds with an answer when prompted.**
    - Sends a riddle daily, 
