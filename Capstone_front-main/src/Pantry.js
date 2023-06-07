import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DispensaApi from "./ApiHelper";
import UpdatePanel from "./UpdatePanel";


function Pantry(props){
let {user} = props
// loads the user data on mount
let [pantry, setPantry] = useState('Loading...')
let navigate = useNavigate()

useEffect(() => {
try {
    console.log(user)
console.log(typeof(pantry))
DispensaApi.getAllIngredients(user.username).then((res) => {
console.log(res)
setPantry(res)

})
} catch (error) {
    console.log(error)
    navigate('/')
}

}, [])



function handleEditClick(e, x){
    e.preventDefault()
    
    console.log(x)
    navigate(`/pantry/${x.id}`)

}





    return(
        <>
            <div className="ingredient_card_holder">
            {typeof(pantry) === 'string' ? pantry : pantry.map((x) => <div style={x.full_amount === '0' ? {border: '3px solid #AE2C35', background:'rgba(174, 44, 53, .3)'} :  {border: '3px solid #0F683A'}} className="ingredient_card">
                <h3>{x.name}</h3>
                <p>Available: {x.available_amount}{x.unit}</p>
                <p>Total Available: {x.full_amount}{x.unit}</p>
                <button onClick={(e) => handleEditClick(e, x)}>Edit</button>
            </div> )}
            </div>
        </>
    )
}

export default Pantry