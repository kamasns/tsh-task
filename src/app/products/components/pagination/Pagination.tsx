import React from 'react';
import './pagination.scss';
import { IMeta } from '../../models/products.interface';

const Pagination = (
    {
      currentPage,
      totalPages,
      handlePaginationNav
    }: Omit<IMeta, 'itemCount' | 'itemsPerPage' | 'totalItems'>
  ) => {

  const MAX_PAGINATION_ITEMS = 6;
  const highestUnavailableIndex = totalPages - 3;
  let skipAmount: number;
  let lowestUnavailableIndex: number;

  if (currentPage >= highestUnavailableIndex) {
    lowestUnavailableIndex =  currentPage - (currentPage - 7)  - (totalPages - currentPage);
    skipAmount = currentPage === totalPages ? 3 : 2;
  } else {
    lowestUnavailableIndex = currentPage !== 1 ? currentPage - 1 : 0;
    skipAmount = currentPage === 1 ? 2 : 1;
  }

  const checkIndex = (index: number): string => {
    let liClass: string = '';

    if (totalPages > MAX_PAGINATION_ITEMS) {
      if (currentPage >= highestUnavailableIndex) {
        if (index === currentPage - skipAmount) {
          liClass += 'dotted';
        } else if ( index <= currentPage - lowestUnavailableIndex) {
          liClass += 'hidden';
        }
      }
      else {
        if (index > currentPage + skipAmount && index <= highestUnavailableIndex) {
          liClass += 'dotted';
        }
        if (index < lowestUnavailableIndex) {
          liClass += 'hidden';
        }
      }
    }

    if (currentPage === index) {
      liClass += ' active';
    }

    return liClass;
  };

  return (
    <div className='pagination'>
      <ul>
        <li
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => handlePaginationNav(1)}
        >First
        </li>

        {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
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