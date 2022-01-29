
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CategoryDropDown from './CategoryDropDown';
import './Navigation.css';
import SearchForm from './SearchForm'
import { useDispatch, useSelector } from 'react-redux';

import { openCart, closeCart, allCartItemsThunk } from '../../store/cart';
import Cart from "../Cart";

const Navigation = ({count, setCount, open, setOpen}) => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);

  const currentCart = useSelector((state) => state.cart)

  const sessionUser = useSelector(state=>state.session.user)

    console.log("currentCart", Object.values(currentCart))

    const currentCartArr = Object.values(currentCart)


  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
    <>
      <ul className="nav2">
        <li>
          <span className="hiUser"> Welcome {sessionUser.username}! </span>
        </li>
        <li>
          <NavLink to="/check-out">Check Out</NavLink>
        </li>
        <li>
          <button
          className="hiUser"
          // className="checkout-button"
          onClick={() => dispatch(openCart())}>
            {/* <i className="fas fa-shopping-cart"></i> */}
            Cart
          </button>
        </li>
        <li>
          <NavLink to="/new-product">Sell Product</NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>

      <div
        className="sidebar"
        style={showCart ? { transform: 'translateX(-100%)' } : {}}
        >
        <div className="sidebar-header">
        <button className="arrow-button" onClick={() => {
          dispatch(closeCart())
          dispatch(allCartItemsThunk(sessionUser?.id))

          }}>
        <i className="fas fa-arrow-right"></i>
        </button>
        </div>

        {currentCartArr.length == 1?
          <div>
            No items in the cart. Start selecting items to purchase.
          </div>
          :
          <Cart count={count} setCount={setCount} open={open} setOpen={setOpen}/>
        }

      </div>
    </>


    )
  } else {
    sessionLinks = (
      <ul className="nav2">
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
  }


  return (
    <div className="headerDiv">
      <nav>
        <ul className="navigation">
          <li>
            <div className="Oney">
              <NavLink to='/' exact={true} activeClassName='active'>
                Oney
              </NavLink>
            </div>
          </li>
          <li>
            <SearchForm />
          </li>
          <li>
            {sessionLinks}
          </li>
        </ul>
      </nav>
      <CategoryDropDown />
    </div>
  );
}

export default Navigation;
