
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import MobileNav from "./Mobile-Nav";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<MobileNav user={'user'} token={'token'}/>)
    </BrowserRouter>
})

// snapshot test
it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><MobileNav user={'user'} token={'token'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})