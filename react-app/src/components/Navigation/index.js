
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CategoryDropDown from './CategoryDropDown';
import './Navigation.css';
import SearchForm from './SearchForm'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { openCart, closeCart, allCartItemsThunk } from '../../store/cart';
import Cart from "../Cart";
import pictures from '../../data/picture';
import Menu from './Menu';

const Navigation = ({count, setCount, open, setOpen}) => {

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);

  const currentCart = useSelector((state) => state.cart.allCartItems)

  const sessionUser = useSelector(state=>state.session.user)

  console.log("sessionUser", sessionUser)

  let currentCartArr



  if(currentCart) {
    currentCartArr = Object.values(currentCart)
  }

  useEffect(() => {
    dispatch(allCartItemsThunk(sessionUser?.id))
  }, [dispatch, open])


  return (
    <div className="">
      <section
      className='coverPhoto'
        style={{
          backgroundImage: `url("${pictures.collection[1].imageUrl}")`
       }}>
        &nbsp;
        <div className="top-menu-position">
          <Menu count={count} setCount ={setCount} open={open} setOpen={setOpen} />
        </div>

        <div className="img-search-container">
        <img src={pictures.collection[0].imageUrl} />
          <div className="searchForm">
            <SearchForm />
          </div>
        </div>
      </section>

      <section>
      <div
        className='categorySkyContainer'
        style={{
          backgroundImage: `url("${pictures.collection[2].imageUrl}")`
        }}>

        <CategoryDropDown />
        </div>


      </section>
    </div>
  );
}

export default Navigation;
