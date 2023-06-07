import React from "react";
import {NavLink, useNavigate} from 'react-router-dom'


function MobileNav(props){

    let {user, token, setUser, setToken} = props
    let navigate = useNavigate()
    
    function LogOutSequence(e){
    e.preventDefault()
    
    setUser(undefined)
    setToken(undefined)
    localStorage.clear()
    navigate('/')
    
    }
    
    
        if(user && token){
            return(
                <>
                <div className="logoM">
                    <span className="logo1">Dispensa<span className="logo2">.io</span></span>
                </div>
                <div className="NavBar_holde-m">
                    <div style={{height:'150px'}}></div>
                    <NavLink className='navs' exact={true} to='/part-form'>Add Single Ingredient</NavLink>
                    <NavLink className='navs' exact={true} to='/full-form'>Add Recipe Ingredients</NavLink>
                    <NavLink className='navs' exact={true} to='/recipes'>Recipes</NavLink>
                    <NavLink className='navs' exact={true} to='/pantry'>Pantry</NavLink>
                    <NavLink className='navs' exact={true} to='/shopping-list'>Shopping List</NavLink>
                    <NavLink className='navs' exact={true} to='/' onClick={(e) => LogOutSequence(e)}>Log Out</NavLink>
                    <div style={{height:'150px'}}></div>
                    
                </div>
                </>
            )
        }else{
    
    
        return(
            <>
            <div className="logo">
                    <span className="logo1">Dispensa<span className="logo2">.io</span></span>
                </div>
            <div className="NavBar_holder-m">
                <NavLink className='navs' exact={true} to='/'>Home</NavLink>
                <NavLink className='navs' exact={true} to='/login' >Login</NavLink>
                <NavLink className='navs' exact={true} to='/signup' >Sign Up</NavLink>
            </div>
            </>
        )}


    
}


export default MobileNav