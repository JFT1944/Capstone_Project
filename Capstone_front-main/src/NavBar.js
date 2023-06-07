import React from "react";
import { NavLink, useNavigate } from "react-router-dom";


function NavBar(props){
let {user, token, setUser, setToken} = props
let navigate = useNavigate()

function LogOutSequence(e){
e.preventDefault()

setUser(undefined)
setToken(undefined)
localStorage.clear()
navigate('/')

}

function handleMobileNav(e){
    e.preventDefault()
    navigate('/mobile-nav')
}


    if(user && token){
        return(
            <>
            <div className="logo">
                <span className="logo1">Dispensa<span className="logo2">.io</span></span>
            </div>
            <div className="NavBar_holder">
                <NavLink className='navs' exact={true} to='/part-form' data-testid='single'>Add Single Ingredient</NavLink>
                <NavLink className='navs' exact={true} to='/full-form'>Add Recipe Ingredients</NavLink>
                <NavLink className='navs' exact={true} to='/recipes'>Recipes</NavLink>
                <NavLink className='navs' exact={true} to='/pantry'>Pantry</NavLink>
                <NavLink className='navs' exact={true} to='/shopping-list'>Shopping List</NavLink>
                <NavLink className='navs' exact={true} to='/' onClick={(e) => LogOutSequence(e)}>Log Out</NavLink>
                
            </div>
            <div className="mobile_button" onClick={(e) => handleMobileNav(e) }>
                <img alt="Pantry Shelving Icon"  src="https://cdn3.iconfinder.com/data/icons/food-technology-2/64/Shelves_Food-shelving-supermarket-drink-512.png"/>
            </div>
            </>
        )
    }else{


    return(
        <>
        <div className="logo">
                <span className="logo1">Dispensa<span className="logo2">.io</span></span>
            </div>
        <div className="NavBar_holder">
            <NavLink className='navs' exact={true} to='/' >Home</NavLink>
            <NavLink className='navs' exact={true} to='/login' >Login</NavLink>
            <NavLink className='navs' exact={true} to='/signup' >Sign Up</NavLink>
        </div>
        </>
    )}
}


export default NavBar