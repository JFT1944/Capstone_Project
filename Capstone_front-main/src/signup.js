import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import DispensaApi from "./ApiHelper";


// This component takes the new users information, sets the token and user state, and the localstorage.
function SignupForm(props){
    let {setToken, setUser} = props
    const navigate = useNavigate()
    // console.log(JoblyApi.token)
    // let {tokenState, token, user, userState} = props
    // // console.log(token)
    // // console.log(tokenState)
    const [formData, getFormData] = useState({
        username: '', 
        password: '', 
        first_name:'',
        last_name:'',
        email:'',
        pref_unit:'US'
    })
    
    const handleChange = (evt) =>{
    
        // updatedFormData(evt.target.value)
        const {name, value} = evt.target;
        getFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    async function submitHandler(e){
        e.preventDefault()
        let {username, password, first_name, last_name, email, pref_unit} = formData
        console.log([username, password, first_name, last_name, email, pref_unit])
        if(!username || !password || !first_name || !last_name || !email) {
            console.log('you fool, try again')
            alert('There is an issue with your information. Please try make sure all spaces are filled and your username is unique')
            return
        }
        try {
                DispensaApi.createUser(formData).then((res) => {
                console.log({signup:res})
                if(!res){
                    alert('There is an issue with your information. Please try make sure all spaces are filled and your username is unique')
                    return 
                }
                
                setToken(res.token)
                setUser(res.user)
                localStorage.setItem('user', JSON.stringify(res.user))
                localStorage.setItem('token', res.token)


            navigate('/')
            return 
        })
        } catch (error) {
          // console.log(error)  
        }    
    
    }

    return(
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignContent:'center',alignItems:'center'}}>
            <h2>Sign Up!</h2>
            {/* <form style={{display:'flex', flexDirection:'column', padding:'20px', maxWidth:'500px', minWidth:'300px'}}> */}
            <form className="iForms">
                <span><input required className='input_box' type='input' name='username' placeholder="Username" value={formData.username} onChange={e => handleChange(e)} data-testid='su1'></input></span>
                <span><input required className='input_box' type='input' name='password' placeholder="Password" value={formData.password} onChange={e => handleChange(e)} data-testid='su2'></input></span>
                <span><input required className='input_box' type='input' name='first_name' placeholder="First Name" value={formData.first_name} onChange={e => handleChange(e)} data-testid='su3'></input></span>
                <span><input required className='input_box' type='input' name='last_name' placeholder="Last Name" value={formData.last_name} onChange={e => handleChange(e)} data-testid='su4'></input></span>
                <span><input required className='input_box' type='input' name='email' placeholder="Email" value={formData.email} onChange={e => handleChange(e)} data-testid='su5'></input></span>
                {/* <input className='input_box' type='input' name='pref_unit' placeholder="Preferred_unit" value={formData.pref_unit} onChange={e => handleChange(e)}></input> */}
                <span>
                <label style={{marginBottom:'10px'}} htmlFor='pref_unit'> Choose a Unit (Imperial or Standard)</label>
                <select required style={{marginBottom: '20px'}} name="pref_unit" value={formData.pref_unit} onChange={(e) => handleChange(e)}>
                    <option value={'US'}>US (Imperial)</option>
                    <option value={'SI'}>SI (Standard)</option>
                </select>
                </span>

                <span className="submit_button"><input type='submit' onClick={e => submitHandler(e) } data-testid='su6'></input></span>
            </form>
        </div>
    )
}


export default SignupForm