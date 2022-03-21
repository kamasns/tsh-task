import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { IItem, IMeta, IParams, IProducts } from './models/products.interface';
import Header from './components/header/Header';
import Product from './components/product/Product';
import Loader from './components/loader/Loader';
import NotFound from './components/notFound/NotFound';
import Pagination from './components/pagination/Pagination';
import './products.scss';

export const Products = () => {
  const [term, setTerm] = useState<string>('');
  const [debouncedTerm, setDebouncedTerm] = useState<string>(term);
  const [promo, setPromo] = useState<boolean | null>(null);
  const [active, setActive] = useState<boolean | null>(null);
  const [results, setResults] = useState<IProducts>();
  const [paginationConfig, setPaginationConfig] = useState<IMeta>();
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchFail, setFetchFail] = useState<boolean>(false);

  const ITEM_LIMIT = 8; // change this value to a lower value to test pagination

  const params = {
    search: debouncedTerm,
    limit: ITEM_LIMIT,
    page: paginationPage,
    promo: promo,
    active: active
  };

  const getDataFromApi = async (params: IParams) => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://join-tsh-api-staging.herokuapp.com/products', {
        params
      });
      setResults(data);
      setPaginationConfig(data.meta);
      setLoading(false);
      setFetchFail(false);
    } catch (err) {
      console.error('Cannot fetch data.', err);
      setFetchFail(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
      setPaginationPage(1);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    void getDataFromApi(params);
  }, [debouncedTerm, active, promo, paginationPage]);

  const handlePromoCheckbox = ():void => {
    if (promo) {
      setPromo(null);
    } else {
      setPromo(true);
    }
    setPaginationPage(1);
  };

  const handleActiveCheckbox = ():void => {
    if (active) {
      setActive(null);
    } else {
      setActive(true);
    }
    setPaginationPage(1);
  };

  const handleSearchTerm = (term: string):void => {
    setTerm(term);
  };

  const renderedProducts = results?.items.length === 0
    ? <NotFound />
    : results?.items.map((item: IItem): JSX.Element => {
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

  const handlePaginationNav = (pageNumber: number) => {
    setPaginationPage(pageNumber);
  };

  return (
    <>
      <Header
        term={term}
        handlePromoCheckbox={handlePromoCheckbox}
        handleActiveCheckbox={handleActiveCheckbox}
        handleSearchTerm={handleSearchTerm}
      />
      <div className='products-wrapper'>
        <div className='container'>
          {fetchFail
            ? <div className='error'>Cannot fetch data.</div>
            : loading
              ? <Loader />
              : (
                <div className='row'>
                  {renderedProducts}
                </div>
              )
          }
        </div>
        {paginationConfig && paginationConfig.totalPages > 1 && !fetchFail
          ? (
            <Pagination
              totalPages={paginationConfig.totalPages}
              currentPage={paginationConfig.currentPage}
              handlePaginationNav={handlePaginationNav}
            />
          )
          : null
        }
      </div>
    </>
  );
};
