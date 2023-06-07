
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import PartForm from "./Part_Form";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<PartForm user={'user'} token={'token'} setUser={'setUser'}/>)
    </BrowserRouter>
})

it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><PartForm user={'user'} token={'token'} setUser={'setUser'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})
