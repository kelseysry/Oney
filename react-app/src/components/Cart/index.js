import User from "../User";

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { clearCartItems, closeCart, getCartItems } from '../../store/cart';
import { useParams} from 'react-router-dom';
import { getOneProduct } from "../../store/product";
import { allCartItemsThunk } from "../../store/cart";
import { deleteCartItem } from "../../store/cart";
import { purchaseCart } from "../../store/cart";
import {useHistory} from "react-router";


import CartItem from "../CartItem";
import './Cart.css';



function Cart({count, setCount, open, setOpen}) {
  const dispatch = useDispatch();
  const {productId} = useParams()
  const history = useHistory();

  const productObject = useSelector((state)=>state.product)


  const cartItemsObj = useSelector((state)=>state.cart.allCartItems)

  let cartItems;

  if(cartItemsObj) {
    cartItems = Object.values(cartItemsObj)
  }

  // try grabbing the cartItems by using a useEffect so you can

  console.log("count change", count)


  console.log("remove updated cart items", cartItems)
  console.log("productObject",productObject)

  const sessionUser = useSelector((state) => state.session);
  const user_id = sessionUser?.user?.id

  const [allProducts, setAllProducts] = useState([])
  const allProductsArr = Object.values(allProducts)


  console.log("allProducts",allProducts)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/cart/${user_id}`)
      const allProductsList = await response.json()
      setAllProducts(allProductsList);
    }
    fetchData();
  },[allProductsArr?.length,count])


  useEffect(()=>{
    dispatch(getOneProduct(productId));
    // return () => clearInterval(getOneProduct(productId));
}, [dispatch, productId, count, open])

  useEffect(() => {
    dispatch(allCartItemsThunk(user_id))


    // return () => clearInterval(allCartItemsThunk(user_id));
  }, [dispatch, user_id, count, open])


  console.log("cartItems", cartItems)


  const prices = cartItems?.map(function(el) {
    return ((el?.products?.price)*(el?.quantity))
     }
  )

  let total = prices?.reduce(function(a,b) {
    return a + b
  })


  const products = Object.values(productObject)
  if (!products.length) return null

  const getProductTitle = async (item_id) => {
    const productTitle = await products.filter(function(el){
      return el.id === item_id
    });
    if (getProductTitle) {

      return productTitle[0]?.title
    }
    else {
      return "hello"
    }
  }


  const handleCheckOutRedirect = () => {
    history.push('/check-out')
    dispatch(closeCart())
  }

  return (
    <div className="cart">
      <ul>
        {cartItems?.map(item => item.id?  <CartItem key={item} item={item} count={count} setCount={setCount}/> :null )}
      </ul>
      <section className="total-section">
        <div className="total-cart">
          <span>
            Total
          </span>
          <span>
          ${total}
          </span>
        </div>

        <button className="purchase-button" type="submit" onClick={handleCheckOutRedirect}>Check Out</button>
      </section>
    </div>
  )
}

export default Cart;
