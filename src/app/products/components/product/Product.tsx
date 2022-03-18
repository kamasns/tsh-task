import React, { useState } from 'react';
import StarRating from './starRating/StarRating';
import { IItem } from '../../models/products.interface';
import './product.scss';
import Modal from '../../../modal/Modal';
import ProductDetails from './productDetails/ProductDetails';


const Product = ({ image, name, description, rating, promo, active }: Omit<IItem, 'id'>) => {

  const [showModal, setShowModal] = useState<boolean>(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className='product'>
      <div className='img-box'>
        <img src={image} alt='' />
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