import React from 'react';
import notFoundIcon from '../../../assets/notfound.svg';
import './notFound.scss'

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={notFoundIcon} alt='' />
      <h4 className="title">Ooops… It’s empty here</h4>
      <p className="description">There are no products on the list</p>
    </div>
  );
};

export default NotFound;