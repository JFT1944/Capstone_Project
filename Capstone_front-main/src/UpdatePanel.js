import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import DispensaApi from "./ApiHelper";


function UpdatePanel(props){
const navigate = useNavigate()
let {user, token} = props
let ingredientForm = useParams()
console.log(ingredientForm)
let [ing, getIng] = useState(undefined)
let [name, getName] = useState('ingredient')

useEffect(() =>{
console.log(ingredientForm)
try {
    DispensaApi.getIngredient(user.username, ingredientForm.ingredientForm).then((res) => {
        console.log(res)
        getIng(res)
        getName(res.name)
    })
} catch (error) {
    console.log(error)
}

}, [])




const [formData, getFormData] = useState({
    available_amount: '', 
    full_amount: ''
})
// let {tokenState, token, user, userState} = props
// console.log(token)

const handleChange = (evt) =>{

    // updatedFormData(evt.target.value)
    const {name, value} = evt.target;
    console.log(evt)
    getFormData(data => ({
        ...data,
        [name]: value
    }))
}


function handleClick(e){
e.preventDefault()
console.log('clicked')
console.log({available_amount:formData.available_amount, full_amount:formData.full_amount})
console.log({id:ing.id})
DispensaApi.updateIngredient(ing.id, formData).then((res) => {
    console.log(res)
    navigate('/pantry')
})
}

if(!ing){
    navigate('/pantry')
}

function handleDelClick(e, x){
    e.preventDefault()
console.log({DATA:[e, x]})

try {
  DispensaApi.removeIngredient(x.id).then((res) => {
    console.log(res)
    navigate('/pantry')
    
  })
} catch (error) {
    console.log(error)
}


}





    return(
        <>
       <div className="updatePanelHolder">
       {/* updatePanelHolder */}
            <div className="">
                <form className="iForms">
                    <h1>Update Your Ingredient</h1>
                    <span><input type={'number'} name={'available_amount'}  value={formData.available_amount} placeholder={`Newly Available Amount for ${name} (Number Only)`} onChange={(e) => handleChange(e)} /></span>
                    <span><input type={'number'} name={'full_amount'} value={formData.full_amount} placeholder={`New Total Amount for ${name} (Number Only)`} onChange={(e) => handleChange(e)} /></span>
                    <span className="submit_button" onClick={(e) => handleClick(e)}><input type={'submit'} /></span>
                    <span className="submit_button" onClick={(e) => handleDelClick(e, ing)}><button>Delete Ingredient</button></span>
                </form>
            </div>
       </div>
        </>
    )
} 



export default UpdatePanel