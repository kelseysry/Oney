import { useDispatch, useSelector } from 'react-redux';
import CartItem from "../CartItem";
import { useState, useEffect } from 'react';
import CheckOutItem from './CheckOutItem';
import { purchaseCart } from "../../store/cart";
import Address from './Address';
import Credit from './Credit';


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

  // const userCredit = sessionUser.user.credit

  let cartItems;
  if(cartItemsObj) {
    cartItems = Object.values(cartItemsObj)
  }

  const getUserAddress = useSelector((state) => state.address.address);

  let userAddress;
  if(getUserAddress) {
    userAddress = getUserAddress[0]
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

  let purchaseMsg;
  if(cartItems?.length === 0 ) {
    purchaseMsg = (
      <div>
        Your cart is empty!
      </div>
    )
  } else {
    purchaseMsg = (
      <div>Please add credit and shipping information in order to purchase</div>
    )
  }

  console.log("cartItems", cartItems)

  return (
    <>

      {user_id? <Address user_id={user_id}/> : null}
      <hr className="checkout-hr"></hr>
      {/* {userCredit? <Credit userCredit={userCredit}/> : null} */}


      {cartItems?.map(item =>
        <section className="CartItemsContainer">
          <CheckOutItem key={item} item={item} user_id={user_id} count={count} setCount ={setCount}/>
        </section>
      )}

      {/* add conditional for credit once added to db *********************/}
      {cartItems?.length && userAddress ?  (

          <form onSubmit={onSubmit}>
            <button className="purchase-button" type="submit">Purchase </button>
          </form>

      )
      :
        purchaseMsg
      }
    </>
  )

}

export default CheckOut
