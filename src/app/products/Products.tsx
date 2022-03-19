import axios from 'axios';

import React, { useState, useEffect, ChangeEvent } from 'react';

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
  const [promo, setPromo] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [results, setResults] = useState<IProducts>();
  const [paginationConfig, setPaginationConfig] = useState<IMeta>();
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const ITEM_LIMIT = 8; // change this value to a lower value to test pagination

  const params = {
    search: debouncedTerm,
    limit: ITEM_LIMIT,
    page: paginationPage,
    promo: promo,
    active: active
  };

  const getDataFromApi = async (params: IParams) => {
    const { data } = await axios.get('https://join-tsh-api-staging.herokuapp.com/products', {
      params
    });
    setResults(data);
    setPaginationConfig(data.meta);
  };

  useEffect(() => {
    void getDataFromApi(params);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
      setActive(active);
      setPromo(promo);
      setPaginationPage(1);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [term, active, promo]);

  useEffect(() => {
    void getDataFromApi(params);
  }, [debouncedTerm, active, promo, paginationPage]);

  const handlePromoCheckbox = () => {
    setPromo(!promo);
  };

  const handleActiveCheckbox = () => {
    setActive(!active);
  };

  const handleSearchTerm = (term: string) => {
    setTerm(term);
  };

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
        {renderedProducts
          ? (
            <div className='container'>
              <div className='row'>
                {renderedProducts}
              </div>
            </div>
          )
          : <Loader />
        }
        {paginationConfig && paginationConfig.totalPages > 1
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
