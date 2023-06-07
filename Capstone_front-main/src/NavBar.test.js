
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<NavBar user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/>)
    </BrowserRouter>
})

// snapshot test
it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><NavBar user={'user'} token={'token'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})