import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../routing/AppRoute.enum';
import './header.scss';

type HeaderProps = {
  term: string,
  handleCheckbox: (id: string) => void,
  handleSearchTerm: (id: string) => void,
}

const Header = (
  {
    term,
    handleCheckbox,
    handleSearchTerm
  }: HeaderProps) => {
  return (
    <header>
      <div className='container'>
        <div className='logo'>join.tsh.io</div>
        <input
          id='search'
          type='text'
          className='search-bar input-field'
          placeholder='search'
          value={term}
          onChange={e => handleSearchTerm(e.target.value)}
        />
        <div className='checkbox-wrapper active'>
          <label htmlFor='active'>Active
            <input className='checkbox' type='checkbox' id='active' onChange={e=> handleCheckbox(e.target.id)} />
            <span className='custom-checkbox' />
          </label>
        </div>
        <div className='checkbox-wrapper promo'>
          <label htmlFor='promo'>Promo
            <input className='checkbox' type='checkbox' id='promo' onChange={e=> handleCheckbox(e.target.id)} />
            <span className='custom-checkbox' />
          </label>

        </div>
        <button className='log-in-btn button-white'>
          <Link to={AppRoute.Login}>Log in</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;