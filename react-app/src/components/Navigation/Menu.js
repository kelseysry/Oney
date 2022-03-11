
import { openNav, closeNav } from '../../store/navigation'
import { useSelector, useDispatch } from "react-redux";
// import './NavigationMenu.css'
import { useHistory } from 'react-router';
import TopMenu from './TopMenu';
import './Navigation.css'
import { openCart, closeCart, allCartItemsThunk } from '../../store/cart';
import { useState, useEffect } from 'react';
import Cart from "../Cart";
import pictures from '../../data/picture';

function Menu({count, setCount, open, setOpen}) {

  const dispatch = useDispatch()
  const history = useHistory();

  const sessionUser = useSelector((state) => state?.session.user);
  const currentCart = useSelector((state) => state.cart.allCartItems)

  const openTopNav = useSelector((state) => state.navigation.shortNav);

  const showCart = useSelector((state) => state.cart.showCart);

  let currentCartArr

  if(currentCart) {
    currentCartArr = Object.values(currentCart)
  }

  useEffect(() => {
    dispatch(allCartItemsThunk(sessionUser?.id))
  }, [dispatch, open])


  const handleOpenNav = (openTopNav) => {
    if(!openTopNav) {
      dispatch(openNav())
    } else {
      dispatch(closeNav())
    }
  }


  return (
    <>
      <section className="top-nav-icon">
        <button className="top-nav-button" onClick={() => handleOpenNav(openTopNav)}>
          <i class="fas fa-bars fa-2x"></i>
        </button>


      <div className="TopMenu"  style={openTopNav ? { transform: 'translateY(100%)' } : {}}>

        {openTopNav ? <TopMenu /> : null}
      </div>

      </section>

    {sessionUser?

    <section className="top-nav-icon">
    <button
    className="top-nav-button"
    onClick={() => dispatch(openCart())}>
      <i className="fas fa-shopping-cart fa-2x"></i>
    </button>

    </section>
      : null
    }

      <div
        className="sidebar"
        style={showCart ? { transform: 'translateX(-100%)', backgroundImage: `url("${pictures.collection[10].imageUrl}")` } : {backgroundImage: `url("${pictures.collection[10].imageUrl}")`}}
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

}

export default Menu
