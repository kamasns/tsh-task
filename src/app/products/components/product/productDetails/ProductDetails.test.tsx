import React from "react";

import { render } from "tests";

import ProductDetails from './ProductDetails';

const productDetailsComponent = (
  <ProductDetails close={()=>{}} title='Incredible Plastic Pizza' description='Molestiae iure eum voluptas culpa et ut quasi.' image='https://i.picsum.photos/id/399/640/480.jpg?hmac=2jhXVrCM-mE3VZibslHQTdIlDcn4GO9H2QZ5GO1FrVs'/>
);

describe("productDetail component", () => {
  test("render image", async () => {
    const { getByAltText } = render(productDetailsComponent);
    expect(getByAltText("Sample image")).toBeInTheDocument();
  });

  test("render title", async () => {
    const { getByText } = render(productDetailsComponent);
    expect(getByText("Incredible Plastic Pizza")).toBeInTheDocument();
  });

  test("render description", async () => {
    const { getByText } = render(productDetailsComponent);
    expect(getByText("Molestiae iure eum voluptas culpa et ut quasi.")).toBeInTheDocument();
  });

  test("render close icon", async () => {
    const { getByAltText } = render(productDetailsComponent);
    expect(getByAltText("cross")).toBeInTheDocument();
  });
});