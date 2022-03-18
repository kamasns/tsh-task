import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../routing/AppRoute.enum';
import { IItem, IProducts } from './models/products.interface';
import Product from './components/product/Product';
import './products.scss';
import Loader from './components/loader/Loader';
import NotFound from './components/notFound/NotFound';

export const Products = () => {
  const [term, setTerm] = useState<string>('');
  const [debouncedTerm, setDebouncedTerm] = useState<string>(term);
  const [promo, setPromo] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [results, setResults] = useState<IProducts>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('https://join-tsh-api-staging.herokuapp.com/products', {
        params: {
          limit: 8,
          page: 1,
          promo: false,
          active: false
        }
      });
      setResults(data);
    })();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
      setActive(active);
      setPromo(promo);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [term, active, promo]);

  useEffect(() => {
    const searchTerm = async () => {
      const { data } = await axios.get('https://join-tsh-api-staging.herokuapp.com/products', {
        params: {
          search: debouncedTerm,
          limit: 8,
          page: 1,
          promo: promo,
          active: active
        }
      });
      setResults(data);
    };
    searchTerm();
  }, [debouncedTerm, active, promo]);


  const renderedProducts = results?.items.length === 0
    ? <NotFound />
    : results?.items.map((item: IItem) => {
    return (
      <Product
        key={item.id}
        image={item.image}
        name={item.name}
        description={item.description}
        rating={item.rating}
        promo={item.promo}
        active={item.active}
      />
    );
  });

  console.log('results', results);

  return (
    <>
      <header>
        <div className='container'>
          <div className='logo'>join.tsh.io</div>
          <input
            type='text'
            className='search-bar'
            placeholder='search'
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <div className='checkbox-wrapper active'>
            <label htmlFor='active'>Active
              <input className='checkbox' type='checkbox' id='active' onChange={() => setActive(!active)} />
              <span className="custom-checkbox"></span>
            </label>

          </div>
          <div className='checkbox-wrapper promo'>
            <label htmlFor='promo'>Promo
              <input className='checkbox' type='checkbox' id='promo' onChange={() => setPromo(!promo)} />
              <span className="custom-checkbox"></span>
            </label>

          </div>
          <button className='log-in-btn button-white'>
            <Link to={AppRoute.Login}>Log in</Link>
          </button>
        </div>
      </header>

      <div className='products-wrapper'>
        {renderedProducts ?
          <div className='container'>
            <div className='row'>
              {renderedProducts}
            </div>
          </div>
          : <Loader />
        }
      </div>
    </>
  );
};
