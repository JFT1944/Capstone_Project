import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DispensaApi from "./ApiHelper";


function ShoppingList(props){
let {user} = props
let [pantry, setPantry] = useState('Loading...')
let navigate = useNavigate()

useEffect(() => {
try {
    console.log(user)
console.log(typeof(pantry))
DispensaApi.getAllIngredients(user.username).then((res) => {
console.log({res:res})
let newRes = res.filter(x => parseInt(x.available_amount) <= 0 )
console.log({newRes:newRes})
setPantry(newRes)

})
} catch (error) {
    console.log(error)
    navigate('/')
}

}, [])


function handlePurchaseButton(e, x){
    e.preventDefault()

    DispensaApi.updateIngredient(x.id, parseInt(x.full_amount) > 0 ? parseInt(x.full_amount) : 1).then((res) => {
    // DispensaApi.updateIngredient(x.id, 1).then((res) => {
        console.log(res)
        document.getElementById(`${x.id}`).remove()

    })



}






    return(
        <>
            <div className="ingredient_card_holder">
            {typeof(pantry) === 'string' ? pantry : pantry.map((x) => <div id={x.id} style={{border: 'black 3px solid', color:'black'}} className="ingredient_card">
                <h3>{x.name}</h3>
                <p>Available: {x.available_amount}{x.unit}</p>
                <p>Total Available: {x.full_amount}{x.unit}</p>
                <button onClick={(e) => handlePurchaseButton(e, x)}>Purchased</button>
            </div> )}
            </div>
        </>
    )
}

export default ShoppingList

// style={x.full_amount === '0' ? {display: 'none'} :  {border: '3px solid #0F683A'}}