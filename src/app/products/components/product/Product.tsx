import React, { useState } from 'react';
import StarRating from './starRating/StarRating';
import { IItem } from '../../models/products.interface';
import Modal from '../../../modal/Modal';
import ProductDetails from './productDetails/ProductDetails';
import './product.scss';

const Product = ({ image, name, description, rating, promo, active }: Omit<IItem, 'id'>) => {

  const [showModal, setShowModal] = useState<boolean>(false)

  const handleModal = ():void => {
    setShowModal(!showModal)
  }

  return (
    <div className='product'>
      <div className='img-box'>
        <img src={image} alt='Sample image' />
        {promo ? <span className='promo-label'>Promo</span> : null}
      </div>
      <div className='content'>
        <h4 className='title'>{name}</h4>
        <p className='description'>{description}</p>
        <div className='rating'>
          <StarRating rating={rating} />
        </div>
        <button className="button-blue" onClick={handleModal} disabled={!active}>{active ? 'Show details' : 'Unavailable'}</button>
      </div>
      {showModal ? <Modal><ProductDetails close={handleModal} title={name} description={description} image={image}/></Modal> : null}
    </div>

  );
};

export default Product;