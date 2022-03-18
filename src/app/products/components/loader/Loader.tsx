import React from 'react';
import spinner from '../../../assets/spinner.svg';
import './loader.scss'

const Loader = () => {
  return (
    <div className="loader">
      <img src={spinner} alt='Loading spinner' />
    </div>
  );
};

export default Loader;