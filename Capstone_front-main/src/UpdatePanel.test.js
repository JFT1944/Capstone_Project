
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import UpdatePanel from "./UpdatePanel";
import { BrowserRouter, MemoryRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<UpdatePanel user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/>)
    </BrowserRouter>
})

it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><UpdatePanel user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})