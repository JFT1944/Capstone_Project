
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Pantry from "./Pantry";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<Pantry user={'user'} token={'token'} setUser={'setUser'}/>)
    </BrowserRouter>
})

it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><Pantry user={'user'} token={'token'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})
