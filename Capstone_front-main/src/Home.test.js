
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import  Home from "./Home";
import { MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    render(<Home user={'user'} token={'token'}/>)
})


it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><Home user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})