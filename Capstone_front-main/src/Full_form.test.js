
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import FullForm from "./Full_Form";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    render(<BrowserRouter>
    <FullForm user={'user'} token={'token'}/>
    </BrowserRouter>)
})

it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><FullForm user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})