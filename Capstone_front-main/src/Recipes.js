import React, { useEffect, useState } from "react";
import DispensaApi from "./ApiHelper";
import { useNavigate } from "react-router-dom";


function Recipes(props){
let {user, token} = props
let [data, setData] = useState([])
let navigate = useNavigate()

useEffect(() => {
if(!user){
    navigate('/')
}
    try {
        console.log({USER:user})
        DispensaApi.getAllRecipes(user.username).then((res) => {
            console.log(res)
            setData(res)
        })
    } catch (error) {
        console.log(error)
    }


}, [])


function addMoreIngredients(e, x){
console.log({Data:[e, x]})
DispensaApi.createAllIngredients(user, x.ingredients).then((res) => {
    console.log(res)
    navigate('/pantry')
})

}
function handleDeleteClick(e,x){
e.preventDefault()

try {
    DispensaApi.deleteRecipe(x.id).then((res) => {
        console.log(res)
        document.getElementById(x.id).remove()
    })
} catch (error) {
    console.log(error)
}


}



console.log({DATA:data})
    if(data[0]){
        return(
            <>
            <div className="ingredient_card_holder">
                {data.map(x => <div id={x.id} className="ingredient_card">
                    <h3>{x.name}</h3>
                    <p>{x.ingredients}</p>
                    <span style={{display:'flex', flexDirection:'column'}}>
                    <button className='r_add_button' onClick={(e) => addMoreIngredients(e, x)}>Add Ingredients To Pantry</button>
                    <button className='r_remove_button'onClick={(e) => handleDeleteClick(e, x)}>Delete</button>
                    </span>
                </div>)}
            </div>
            </>
        )
    } else {
        <h1>No Recipes Added</h1>
    }
}


export default Recipes