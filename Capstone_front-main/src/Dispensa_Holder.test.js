
import React from "react";
import { render, fireEvent, getByTestId, screen } from "@testing-library/react";
import DispensaHolder from "./Dispensa_Holder";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<DispensaHolder user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/>)
    </BrowserRouter>
})

it('should render without crashing', () => {
    render(<MemoryRouter><DispensaHolder /></MemoryRouter>)
})






// it('Navbar => from Login to each page.', async () => {
    
//     // let setUser = jest.fn()
//     // jest.spyOn(React, 'setUser').mockImplementationOnce((user) => [user, setUser])

//     render(<MemoryRouter><DispensaHolder /></MemoryRouter>)
//     let Login = await screen.findByText('Login')
//     let signup = await screen.findByText('Sign Up')
//     expect(Login).toBeInTheDocument()
//     expect(signup).toBeInTheDocument()
//     fireEvent.click(signup)
//     expect(await screen.findByText('Sign Up!')).toBeInTheDocument()
//     fireEvent.click(Login)
//     expect(await screen.findByText('Login!')).toBeInTheDocument()
//     let username_input = await screen.findByPlaceholderText('Username')
//     let password_input = await screen.findAllByPlaceholderText('Password')
//     fireEvent.change(username_input, {target: {value: 'jp'}})
//     fireEvent.change(password_input[0], {target: {value: 'jpjpjp'}})
//     console.log({newp:password_input[0], newu:username_input})
//     let submit = await screen.findByTestId('subBut')
//     fireEvent.click(submit)
//     // setUser({username: 'jp', password: 'jpjpjp'})
    
//     expect(await screen.findByText('single')).toBeInTheDocument()
    
    
//     // let b1 = await screen.findByText('single')
//     // let b2 = await screen.findByText('Add Recipe Ingredients')
//     // let b3 = await screen.findByText('Recipes')
//     // let b4 = await screen.findByText('Pantry')
//     // let b5 = await screen.findByText('Shopping List')
//     // fireEvent.click(b1)
//     // expect(await screen.findByText('Name')).toBeInTheDocument()
//     })