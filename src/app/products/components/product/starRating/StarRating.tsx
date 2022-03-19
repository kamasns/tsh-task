import React from 'react';
import { Rating } from '../../../models/products.interface'
import starIconFull from '../../../../assets/star-full.svg'
import starIconEmpty from '../../../../assets/star-empty.svg'

const StarRating = ({ rating }: { rating: Rating }) => {

  const starEmpty = <img src={starIconEmpty} alt="Empty star icon" />
  const starFull = <img src={starIconFull} alt="Filled star icon" />

  return (
   <>
      {[...Array(5)].map((_, index) => {
        const content = index <= rating ? starFull : starEmpty;

        return (
          <React.Fragment key={index}>
            {content}
          </React.Fragment>
        );
      })}
   </>
  );
};

export default StarRating;
