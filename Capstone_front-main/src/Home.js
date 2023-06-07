import React from "react";
import { NavLink } from "react-router-dom";



function Home(props){
let {user, token} = props
console.log(user)


if(user){
    return(
        <>
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', color:'#0F683A'}}>
        <h2>Welcome {user.firstName}</h2>
        </div>
        </>
    )
}else{
    return(
        <>
        <div id='signin_holder' style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', color:'#0F683A'}}>
        <h2>Welcome to Dispensa<span className="logo2">.io!</span></h2>
        <h3>The best place to store your digital pantry and speed up your shopping experience.</h3>
         <NavLink exact to='/login' >Login:</NavLink>
         <NavLink exact to='/signup' >Sign Up:</NavLink>
        </div>
        </>
    )
}
    
}

export default Home