import React from "react";

import { render } from "tests";

import Product from './Product';

const ProductComponent = (
  <Product
    image='https://i.picsum.photos/id/657/640/480.jpg?hmac=_ZmSeyKcr00CS0Lj8Nbi6wMVTU_RpzON9-ys2FVwf6A'
    name='Tasty Rubber Car'
    description='Explicabo accusamus optio facilis nobis officiis sed nisi omnis quia.'
    rating={5}
    promo={true}
    active={true}
  />
);

describe("StarRating component", () => {
  test("render image", async () => {
    const { getByAltText } = render(ProductComponent);
    expect(getByAltText("Sample image"));
  });

  test("render title", async () => {
    const { getByText } = render(ProductComponent);
    expect(getByText("Tasty Rubber Car")).toBeInTheDocument();
  });

  test("render description", async () => {
    const { getByText } = render(ProductComponent);
    expect(getByText("Explicabo accusamus optio facilis nobis officiis sed nisi omnis quia.")).toBeInTheDocument();
  });

  test("render button", async () => {
    const { getByText } = render(ProductComponent);
    expect(getByText("Show details")).toBeInTheDocument();
  });
});