import React, { useMemo } from 'react';
import { IMeta } from '../../models/products.interface';
import { arrRange } from '../../../utlis/utils';
import './pagination.scss';

const Pagination = (
  {
    currentPage,
    totalPages,
    handlePaginationNav
  }: Omit<IMeta, 'itemCount' | 'itemsPerPage' | 'totalItems' >
) => {
  const paginationItems = useMemo(()=> arrRange(totalPages), [totalPages])
  const MAX_PAGINATION_ITEMS = 6;
  const highestUnavailableIndex = totalPages - 3;
  let skipAmount: number;
  let lowestUnavailableIndex: number;

  if (currentPage >= highestUnavailableIndex) {
    lowestUnavailableIndex = currentPage - (currentPage - 7) - (totalPages - currentPage);
    skipAmount = currentPage === totalPages ? 3 : 2;
  } else {
    lowestUnavailableIndex = currentPage !== 1 ? currentPage - 1 : 0;
    skipAmount = currentPage === 1 ? 2 : 1;
  }

  const checkIndex = (paginationPage: number): string => {
    let liClass: string = '';

    if (totalPages > MAX_PAGINATION_ITEMS) {
      if (currentPage >= highestUnavailableIndex) {
        if (paginationPage === currentPage - skipAmount) {
          liClass += 'dotted';
        } else if (paginationPage <= currentPage - lowestUnavailableIndex) {
          liClass += 'hidden';
        }
      } else {
        if (paginationPage > currentPage + skipAmount && paginationPage <= highestUnavailableIndex) {
          liClass += 'dotted';
        }
        if (paginationPage < lowestUnavailableIndex) {
          liClass += 'hidden';
        }
      }
    }

    if (currentPage === paginationPage) {
      liClass += ' active';
    }
    return liClass;
  }

  return (
    <div className='pagination'>
      <ul>
        <li
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => handlePaginationNav(1)}
        >First
        </li>

        {paginationItems.map((item, index): JSX.Element => (
            <li
              key={item}
              className={checkIndex(index + 1)}
              onClick={() => handlePaginationNav(index + 1)}
            >{index + 1}
            </li>
          )
        )}

        <li
          className={currentPage === totalPages ? 'disabled' : ''}
          onClick={() => handlePaginationNav(totalPages)}
        >Last
        </li>
      </ul>
    </div>
  );
};

export default Pagination;