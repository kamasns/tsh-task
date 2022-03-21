import React, { useState, useEffect, ChangeEvent } from 'react';

import axios from 'axios';
import { useWindowWidth } from '@react-hook/window-size';

import { IItem, IMeta, IParams, IProducts } from './models/products.interface';
import Header from './components/header/Header';
import Product from './components/product/Product';
import Loader from './components/loader/Loader';
import NotFound from './components/notFound/NotFound';
import Pagination from './components/pagination/Pagination';
import './products.scss';
import { ECheckboxID } from './models/enums';

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
  const windowWidth = useWindowWidth();
  const MOBILE_BREAKPOINT = 575;

  const itemLimit = windowWidth < MOBILE_BREAKPOINT ? 4 : 8;

  const params = {
    search: debouncedTerm,
    limit: itemLimit,
    page: paginationPage,
    promo: promo,
    active: active
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
    setPaginationPage(1);
  }, [itemLimit]);

  useEffect(() => {
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

    void getDataFromApi(params);
  }, [debouncedTerm, active, promo, paginationPage, itemLimit]);


  const handleCheckbox = (id: string) => {
    if (id === ECheckboxID.Active) {
      if (active) {
        setActive(null);
      } else {
        setActive(true);
      }
    } else if (id === ECheckboxID.Promo) {
      if (promo) {
        setPromo(null);
      } else {
        setPromo(true);
      }
    }
    setPaginationPage(1);
  };

  const handleSearchTerm = (term: string): void => {
    setTerm(term);
  };

  const handlePaginationNav = (pageNumber: number) => {
    setPaginationPage(pageNumber);
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

  return (
    <>
      <Header
        term={term}
        handleCheckbox={handleCheckbox}
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
