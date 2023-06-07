import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import DispensaApi from "./ApiHelper";



function PartForm(props){
    let {user} = props
    const navigate = useNavigate()

    if(!user){
        navigate('/')
    }

    const [formData, getFormData] = useState({
        name: '', 
        unit: '', 
        available_amount:'',
        full_amount:''
    })


function handleChange(e){
    const {name, value} = e.target;
    getFormData(data => ({
        ...data,
        [name]: value
    }))

}



function handleClick(e){
e.preventDefault()
console.log(e)
formData.username = user.username
try {
    DispensaApi.createIngredient(formData).then((res) => {
        console.log(res)
        navigate('/pantry')
    })
} catch (error) {
    console.log(error)
}
}

   if(user){
    return(
        <>
        <form className="iForms">
           <span>Name: <input className='input_box' type='text' value={formData.name} name='name' placeholder="Name of ingredient"  onChange={(e) => handleChange(e)}></input></span>
           <span>Unit: <input className='input_box' type='text' name='unit' value={formData.pref_unit} placeholder="oz, lbs, litre, etc"  onChange={(e) => handleChange(e)}></input></span>
           <span>Available Amount: <input className='input_box' type='number' value={formData.available_amount} name='available_amount' placeholder="How much do you have?"  onChange={(e) => handleChange(e)}></input></span>
           <span>Total Amount: <input className='input_box' type='number' value={formData.full_amount} name='full_amount' placeholder="How much is on the packaging?"  onChange={(e) => handleChange(e)}></input></span>
           <span className="submit_button"><input className='input_box' type='submit' placeholder="" value={'Submit Ingredient'} onClick={(e) => handleClick(e)}></input></span>
        </form>
        </>
    )
   }else{
    return(
        <>
            {navigate('/')}
        </>
    )
   }
}


export default PartForm