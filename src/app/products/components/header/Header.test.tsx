import React from "react";

import { render } from "tests";

import Header from './Header';

const headerComponent = (
  <Header
    term=''
    handlePromoCheckbox={()=>{}}
    handleActiveCheckbox={()=>{}}
    handleSearchTerm={()=>{}}
  />
);

describe("Header component", () => {
  test("render header inputs", async () => {
    const { getByPlaceholderText, getByLabelText } = render(headerComponent);

    expect(getByPlaceholderText('search')).toBeInTheDocument();
    expect(getByLabelText('Active')).toBeInTheDocument();
    expect(getByLabelText('Promo')).toBeInTheDocument();

  });
});