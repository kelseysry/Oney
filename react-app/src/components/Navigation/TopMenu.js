import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { openCart, closeCart, allCartItemsThunk } from '../../store/cart';
import Cart from "../Cart";
import pictures from '../../data/picture';

const TopMenu = ({count, setCount, open, setOpen}) => {

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

  let noSessionUser;

    noSessionUser = (
      <ul className="nav2" style={{
        backgroundImage: `url("${pictures.collection[4].imageUrl}")`
     }}>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
          </NavLink>
        </li>
      </ul>
    )


 return (

  <>
  {sessionUser?
      <ul className="nav2" style={{
        backgroundImage: `url("${pictures.collection[2].imageUrl}")`
     }}>
        <li>
          <div className="Oney">
              <NavLink to='/' exact={true} activeClassName='active'>
                Oney
              </NavLink>
            </div>
        </li>
        <li>
          <span className="hiUser"> Welcome {sessionUser.username}! </span>
        </li>
        <li>
          <NavLink to="/check-out">Check Out</NavLink>
        </li>

        <li>
          <NavLink to="/new-product">Sell Product</NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>

  :
  noSessionUser}
</>

 )



}

export default TopMenu
