import React from "react";

import { render } from "tests";

import Pagination from './Pagination';

const paginationComponent = (
  <Pagination
    totalPages={13}
    currentPage={3}
    handlePaginationNav={()=>{}}
  />
);

describe("productDetail component", () => {
  test("render pagination", async () => {
    const { getByText } = render(paginationComponent);
    expect(getByText('1')).toHaveClass('hidden');
    expect(getByText('13')).toBeVisible();
    expect(getByText('First')).toBeVisible();
    expect(getByText('Last')).toBeVisible();

  });

});