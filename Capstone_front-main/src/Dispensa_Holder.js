
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DispensaApi from './ApiHelper'
import LoginForm from './LoginForm'
import SignupForm from './signup'
import NavBar from './NavBar'
import Pantry from './Pantry'
import PartForm from './Part_Form'
import FullForm from './Full_Form'
import ShoppingList from './ShoppingList'
import UpdatePanel from './UpdatePanel'
import Home from './Home'
import MobileNav from './Mobile-Nav'
import Recipes from './Recipes'

function DispensaHolder(props){
let {user, setUser, token, setToken} = props
console.log('dispensaHolder')
// useEffect(() =>{
//     DispensaApi.getUsers().then((res) => {
//         console.log(res)
//     })
// }, [])


    return(
        <>
        <div className='dispensa_holder'>

        {/* <BrowserRouter> */}
                <NavBar user={user} token={token} setUser={setUser} setToken={setToken}/>
                <Routes>
                    <Route exact path='/' element={<Home user={user} token={token} />}/>
                    <Route exact path='/ingredient' element={'ingredient'}/>
                    <Route exact path='/pantry' element={<Pantry user={user} token={token} setUser={setUser}/>}/>
                    <Route exact path='/shopping-list' element={<ShoppingList user={user} token={token} setUser={setUser} />}/>
                    <Route exact path='/part-form' element={<PartForm user={user} token={token} />}/>
                    <Route exact path='/full-form' element={<FullForm user={user} token={token} />}/>
                    <Route exact path='/recipes' element={<Recipes user={user} token={token} />}/>
                    <Route exact path='/signup' element={<SignupForm user={user} setUser={setUser} token={token} setToken={setToken} />}/>
                    <Route exact path='/login' element={<LoginForm user={user} setUser={setUser} token={token} setToken={setToken} />}/>
                    <Route exact path='/mobile-nav' element={<MobileNav user={user} setUser={setUser} token={token} setToken={setToken} />}/>
                    <Route exact path='/pantry/:ingredientForm' element={<UpdatePanel user={user} token={token}/>}/>
                    {/* <Route exact path='/pantry/:ingredientForm' element={'122'}/> */}

                </Routes>
            {/* </BrowserRouter> */}
        </div>
        </>
    )
}


export default DispensaHolder