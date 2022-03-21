import React, { MouseEventHandler } from 'react';
import closeIcon from '../../../../assets/close.svg';
import './productDetails.scss';

const ProductDetails = (
  {
    close,
    description,
    title,
    image
  }: { close: MouseEventHandler, title: string, description: string, image: string }) => {

  return (
    <div className='product-details'>
      <div className='img-box'>
        <img src={image} alt="Sample image" />
        <button className='close' onClick={close}><img src={closeIcon} alt='cross' /></button>
      </div>
      <div className='content'>
        <h4 className='title'>{title}</h4>
        <p className='description'>{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;