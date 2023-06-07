
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { BrowserRouter, MemoryRouter } from "react-router-dom";




it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<LoginForm user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/>)
    </BrowserRouter>
})


it('should match snapshot', () => {
    const {asFragment} = render(<MemoryRouter><LoginForm user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/></MemoryRouter>)
    expect(asFragment()).toMatchSnapshot()
})
