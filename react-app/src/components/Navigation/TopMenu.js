import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { openNav, closeNav } from '../../store/navigation'

import { openCart, closeCart, allCartItemsThunk } from '../../store/cart';
import Cart from "../Cart";
import pictures from '../../data/picture';
import * as sessionActions from '../../store/session';

const TopMenu = ({count, setCount, open, setOpen}) => {

  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);


  const showCart = useSelector((state) => state.cart.showCart);

  const currentCart = useSelector((state) => state.cart.allCartItems)

  const sessionUser = useSelector(state=>state.session.user)


  let currentCartArr

  if(currentCart) {
    currentCartArr = Object.values(currentCart)
  }

  useEffect(() => {
    dispatch(allCartItemsThunk(sessionUser?.id))
  }, [dispatch, open])

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const email = 'demo@aa.io';
    const password = 'password';
    dispatch(sessionActions.login(
      email, password
    ))
  }

  const handleCloseNav = () => {
    dispatch(closeNav())
  }



  let noSessionUser;

    noSessionUser = (
      <ul className="nav2" style={{
        backgroundImage: `url("${pictures.collection[10].imageUrl}")`
     }}>
        <li>
          <NavLink to='/login' onClick={handleCloseNav} exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' onClick={handleCloseNav} exact={true} activeClassName='active'>
                Sign Up
          </NavLink>
        </li>
        <li>
         <button className="nav-demo-button" onClick={handleDemoLogin} type="submit">Demo</button>
        </li>
      </ul>
    )


 return (

  <>
  {sessionUser?
      <ul className="nav2" style={{
        backgroundImage: `url("${pictures.collection[10].imageUrl}")`
     }}>
        <li>
          <div className="Oney">
              <NavLink to='/' exact={true} onClick={handleCloseNav} activeClassName='active'>
                Home
              </NavLink>
            </div>
        </li>
        <li>
          <span className="hiUser"> Welcome {sessionUser.username}! </span>
        </li>
        <li>
          <NavLink to="/check-out" onClick={handleCloseNav} >Check Out</NavLink>
        </li>

        <li>
          <NavLink to="/new-product" onClick={handleCloseNav} >Sell Product</NavLink>
        </li>
        <li onClick={handleCloseNav} >
          <LogoutButton />
        </li>
      </ul>

  :
  noSessionUser}
</>

 )



}

export default TopMenu
