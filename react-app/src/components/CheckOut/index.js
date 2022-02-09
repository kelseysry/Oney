import { useDispatch, useSelector } from 'react-redux';
import CartItem from "../CartItem";
import { useState, useEffect } from 'react';
import CheckOutItem from './CheckOutItem';
import { purchaseCart } from "../../store/cart";
import Address from './Address';
import Credit from './Credit';
import pictures from '../../data/picture';


const CheckOut = ({count, setCount}) => {

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

  console.log("sessionUser", sessionUser.user.credit)

  const userAddress = sessionUser.user.address
  // const userCredit = sessionUser.user.credit

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
    <section className="page-checkout">
      <div
        className="checkout-title-container"
          style={{
            backgroundImage: `url("${pictures.collection[6].imageUrl}")`
        }}>
          <div className='checkout-title'>
            Checkout
            <img className='cart-pic' src={pictures.collection[7].imageUrl}/>
          </div>
      </div>


    <section className="check-out-page">
      <section>
        <div className="shipping-credit-container">
          <img className="bigLeaf" src={pictures.collection[5].imageUrl} />
          <div>
            {user_id? <Address user_id={user_id}/> : null}
            <hr className="checkout-hr"></hr>
            <Credit user_id={user_id} />
          </div>
        </div>

        <div className="cart-items-container">
          {cartItems?.map(item =>
            <div className="CartItemsContainer">
              <CheckOutItem key={item} item={item} user_id={user_id} count={count} setCount ={setCount}/>
            </div>
          )}
        </div>
      </section>

      <section className="purchase-total-container">
        {cartItems?.length?
            <div>
              <form onSubmit={onSubmit}>
                <button className="purchase-button" type="submit">Place Your Order </button>
              </form>
              <div>
                <h1>Order Summary</h1>

              </div>
            </div>
        :
        <div>nothing in cart</div>
        }
      </section>
    </section>



    </section>
  )

}

export default CheckOut
