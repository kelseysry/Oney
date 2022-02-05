
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

const Navigation = ({count, setCount, open, setOpen}) => {

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);

  const currentCart = useSelector((state) => state.cart.allCartItems)

  const sessionUser = useSelector(state=>state.session.user)

  console.log("sessionUser", sessionUser)

  let currentCartArr

  // const [cartItemsDoneLoading, setCartItemsDoneLoading] = useState([])


  // const currentCartArr = Object.values(currentCart)

  if(currentCart) {
    // console.log("currentCart", Object.values(currentCart).length)
    currentCartArr = Object.values(currentCart)
  }

  useEffect(() => {
    dispatch(allCartItemsThunk(sessionUser?.id))


    // return () => clearInterval(allCartItemsThunk(user_id));
  }, [dispatch, open])

  // console.log("currentCartArr", currentCartArr)
  // console.log("currentCar", currentCart)


  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
    <>

      <ul className="nav2">
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
          <button
          className="hiUser"
          onClick={() => dispatch(openCart())}>
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

        {currentCartArr?.length > 0 ?
            <Cart count={count} setCount={setCount} open={open} setOpen={setOpen}/>
          :
          <div>
            No items in the cart. Start selecting items to purchase.
          </div>
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
    <div className="">
      <section
      className='coverPhoto'
      style={{
        backgroundImage: `url("${pictures.collection[1].imageUrl}")`
      }}>
        &nbsp;
        {sessionLinks}
        <div className="img-search-container">
        <img src={pictures.collection[0].imageUrl} />
          <div className="searchForm">
            <SearchForm />
          </div>

        </div>
      </section>

      <CategoryDropDown />
    </div>
  );
}

export default Navigation;
