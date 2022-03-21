import React from "react";

import { render } from "tests";

import StarRating from './StarRating';

const starRatingComponent = (
  <StarRating rating={3} />
);

describe("StarRating component", () => {
  test("render image", async () => {
    const { getAllByAltText } = render(starRatingComponent);
    expect(getAllByAltText("Filled star icon")).toHaveLength(3);
  });
});