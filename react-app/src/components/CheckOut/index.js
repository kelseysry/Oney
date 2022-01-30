import { useDispatch, useSelector } from 'react-redux';
import CartItem from "../CartItem";
import { useState, useEffect } from 'react';
import CheckOutItem from './CheckOutItem';
import { purchaseCart } from "../../store/cart";


const CheckOut = () => {

  // const [products, setProducts] = useState([])
  const sessionUser = useSelector((state) => state.session);
  const productObject = useSelector((state)=>state.product)
  const products = Object.values(productObject)
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([])
  const [isLoad, setIsLoaded] = useState(false)
  const allProductsArr = Object.values(allProducts)
  const cartItemsObj = useSelector((state)=>state.cart.allCartItems)
  const user_id = sessionUser.user.id

  let cartItems;
  if(cartItemsObj) {
    cartItems = Object.values(cartItemsObj)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/cart/${user_id}`)
      const allProductsList = await response.json()
      if(allProductsList) {
        setIsLoaded(true)
      }
      setAllProducts(allProductsList);
    }
    fetchData();
  },[products.length, allProductsArr.length, isLoad])


  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Thank you for purchasing! Your items will arrive in 2 business days."

       );

      cartItems.map((item , idx)=> (dispatch(purchaseCart(item.id, user_id))))
    }

  return (
    <>
      {cartItems?.map(item =>
        <section className="CartItemsContainer">
          <CheckOutItem key={item} item={item} user_id={user_id}/>
        </section>
      )}
      {cartItems?.length?
          <form onSubmit={onSubmit}>
            <button className="purchase-button" type="submit">Purchase </button>
          </form>
      :
      <div>nothing in cart</div>
    }
    </>
  )

}

export default CheckOut
