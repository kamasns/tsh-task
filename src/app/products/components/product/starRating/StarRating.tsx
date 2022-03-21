import React from 'react';
import { Rating } from '../../../models/products.interface';
import { arrRange } from '../../../../utlis/utils';
import starIconFull from '../../../../assets/star-full.svg';
import starIconEmpty from '../../../../assets/star-empty.svg';

const stars = arrRange(5);

const StarRating = ({ rating }: { rating: Rating }) => {
  return (
    <>
      {stars.map((star, index): JSX.Element => {
        const content = index  < rating
          ? <img src={starIconFull} alt='Filled star icon' />
          : <img src={starIconEmpty} alt='Empty star icon' />;

        return (
          <React.Fragment key={star}>
            {content}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default StarRating;
