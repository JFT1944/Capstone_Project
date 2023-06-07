
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Recipes from "./Recipes";
import { BrowserRouter } from "react-router-dom";


// write a smoke test for the home component

it('should appear in a smoketest', () => {
    <BrowserRouter>
    render(<Recipes user={'user'} setUser={'setUser'} token={'token'} setToken={'setToken'}/>)
    </BrowserRouter>
})



