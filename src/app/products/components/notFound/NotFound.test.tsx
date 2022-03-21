import React from "react";

import { render } from "tests";

import NotFound from './NotFound';

const NotFoundComponent = (
  <NotFound />
);

describe("NotFound component", () => {
  test("render NotFound component", async () => {
    const { getByText } = render(NotFoundComponent);

    expect(getByText('Ooops… It’s empty here')).toBeInTheDocument();
    expect(getByText('There are no products on the list')).toBeInTheDocument();
  });
});