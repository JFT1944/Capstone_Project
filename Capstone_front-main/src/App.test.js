// import for tests

import React from 'react';
import { render, fireEvent, getByTestId, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
process.env.NODE_ENV = 'test';




it('should render without crashing', () => {
    render(<App />)
    
})

it('should match snapshot', () => {
    const {asFragment} = render(<App />)
    expect(asFragment()).toMatchSnapshot()
})
// ############################################
// this test must increments the signup username by 1 each time to work
// ############################################

// it('should render the signup page', async () => {
//     render(<App />)
//     expect(screen.getByText('Sign Up')).toBeInTheDocument()
//     let signup = await screen.findByText('Sign Up')
//     fireEvent.click(signup)
//     expect(await screen.findByText('Sign Up!')).toBeInTheDocument()
//     let b1 = await screen.findByTestId('su1')
//     let b2 = await screen.findByTestId('su2')
//     let b3 = await screen.findByTestId('su3')
//     let b4 = await screen.findByTestId('su4')
//     let b5 = await screen.findByTestId('su5')
//     let b6 = await screen.findByTestId('su6')
//     // must increment the username by 1 each time to work
//     fireEvent.change(b1, {target: {value: 'jp1006'}})
//     fireEvent.change(b2, {target: {value: 'jpjpjp'}})
//     fireEvent.change(b3, {target: {value: 'Justin'}})
//     fireEvent.change(b4, {target: {value: 'Peters'}})
//     fireEvent.change(b5, {target: {value: 'jp@gmail.com'}})

//     fireEvent.click(b6)
//     expect(await screen.findByText(`Welcome 
//         Justin`)).toBeInTheDocument()
// })

it('Navbar => from Login to each page.', async () => {
    
    // let setUser = jest.fn()
    // jest.spyOn(React, 'setUser').mockImplementationOnce((user) => [user, setUser])

    render(<App />)
    let Login = await screen.findByText('Login')
    let signup = await screen.findByText('Sign Up')
    expect(Login).toBeInTheDocument()
    expect(signup).toBeInTheDocument()
    fireEvent.click(signup)
    expect(await screen.findByText('Sign Up!')).toBeInTheDocument()
    fireEvent.click(Login)
    expect(await screen.findByText('Login!')).toBeInTheDocument()
    let username_input = await screen.findByPlaceholderText('Username')
    let password_input = await screen.findAllByPlaceholderText('Password')
    fireEvent.change(username_input, {target: {value: 'jp'}})
    fireEvent.change(password_input[0], {target: {value: 'jpjpjp'}})
    console.log({newp:password_input[0], newu:username_input})
    let submit = await screen.findByTestId('subBut')
    fireEvent.click(submit)
    // setUser({username: 'jp', password: 'jpjpjp'})
    expect(await screen.findByText('Welcome Justin')).toBeInTheDocument()
    expect(await screen.findByText('Add Single Ingredient')).toBeInTheDocument()
    let b1 = await screen.findByText('Add Single Ingredient')
    fireEvent.click(b1)
    expect(await screen.findByPlaceholderText('Name of ingredient')).toBeInTheDocument()
    let b2 = await screen.findByText('Add Recipe Ingredients')
    fireEvent.click(b2)
    expect(await screen.findByPlaceholderText('Recipe Name (Not Necessary)')).toBeInTheDocument()
    let b3 = await screen.findByText('Recipes')
    fireEvent.click(b3)
    expect(await screen.findByText('Cherry Listerine')).toBeInTheDocument()
    let b4 = await screen.findByText('Pantry')
    fireEvent.click(b4)
    expect(await screen.findByText('turkey')).toBeInTheDocument()
    let b5 = await screen.findByText('Shopping List')
    fireEvent.click(b5)
    expect(await screen.findByText('clover')).toBeInTheDocument()
    let b6 = await screen.findByText('Log Out')
    fireEvent.click(b6)
    expect(await Login).toBeInTheDocument()
    


    
    // let b2 = await screen.findByText('Add Recipe Ingredients')
    // let b3 = await screen.findByText('Recipes')
    // let b4 = await screen.findByText('Pantry')
    // let b5 = await screen.findByText('Shopping List')
    // fireEvent.click(b1)
    // expect(await screen.findByText('Name')).toBeInTheDocument()
    })