import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import DispensaApi from "./ApiHelper";


// This component allows the user to login.
// it also sets the state, updates the joblyapi, and the localstorage 
// with the user info and token.
function LoginForm(props){
let {user, setUser, token, setToken} = props
const navigate = useNavigate();
// holds form information
const [formData, getFormData] = useState({
    username: '', 
    password: ''
})
// let {tokenState, token, user, userState} = props
// console.log(token)


const handleChange = (evt) =>{

    // updatedFormData(evt.target.value)
    const {name, value} = evt.target;
    getFormData(data => ({
        ...data,
        [name]: value
    }))
}
// handles the submit of the form
function clickHandler(e){
    e.preventDefault()
    if(!formData.username || !formData.password){
        alert('please input correct information')
        return
    }
    // communicates with the backend to login
    DispensaApi.login(formData.username, formData.password).then((res) => {
        console.log(res)
       try {
        setUser(res.user)
        setToken(res.token)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
       } catch (error) {
        console.log(error)
       }


        navigate('/')
    })
    // DispensaApi.login(formData).then((res) => {
    
    //     // console.log(res)
    //     tokenState(res)
    //     navigate('/')
        // console.log(formData)
        // DispensaApi.getUser(formData.username, res[0]).then((resx) => {
        //     let {email, firstName, lastName, username} = formData
        //     // console.log({resx:resx})
        //     userState(resx)
        //     localStorage.setItem('userInfo', JSON.stringify(resx))
        // })

    // })

    // console.log(user)

}

    return(
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignContent:'center',alignItems:'center'}}>
            <h2>Login!</h2>
            {/* <form className={'iForms'} style={{display:'flex', flexDirection:'column', padding:'20px', maxWidth:'500px', minWidth:'300px', alignContent:'center', justifyContent:'center'}}> */}
            <form className={'iForms'} >
                <span><input className='input_box' type='input' name='username' placeholder="Username" value={formData.username} onChange={(e) => handleChange(e)}></input></span>
                <span><input className='input_box' type='input' name ='password' placeholder="Password" value={formData.password} onChange={(e) => handleChange(e)}></input></span>
                <span className="submit_button"><input type='submit' onClick={(e) => clickHandler(e)} data-testid='subBut'></input></span>
            </form>
        </div>
    )
}


export default LoginForm