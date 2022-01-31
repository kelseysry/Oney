import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateCartThunk, deleteCartItem } from '../../store/cart';

function CartItem({ item, count, setCount}) {
  const dispatch = useDispatch();
  let [quantity, setQuantity] = useState(item.quantity);
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const sessionUser = useSelector((state) => state.session);
  const cartItemsObj = useSelector((state)=>state.cart.allCartItems)
  const allProductsArr = Object.values(allProducts)

  let cartItems;
  if(cartItemsObj) {
    cartItems = Object.values(cartItemsObj)
  }

  useEffect(() => {
    setQuantity(item.quantity);
     return () => clearInterval(setQuantity(item.quantity));
  }, [item.quantity, count]);


  // NOTE: so the cart.id doesn't have any meaning, we connect the user to their cart
  // by just using the user_id in the cart table
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/carts/${user_id}`)
      const productsList = await response.json()
      setProducts(productsList?.allCartItems);
    }
    fetchData();
  },[count, products.length])


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/cart/${user_id}`)
      const allProductsList = await response.json()
      setAllProducts(allProductsList);
    }
    fetchData();
  },[count, products.length])

  let user_id;
  if(sessionUser) {
    user_id = sessionUser?.user?.id
  } else {
    return null
  }

  const productsArray = Object?.values(products)
  // console.log("productsArray",productsArray)
  const getProductTitle = (item_id) => {
    const productTitle = allProductsArr.filter(function(el){

      return el.id === item_id
    });
    if (getProductTitle) {
      console.log("productTitle",productTitle)
      return productTitle[0]?.title
    }
    else {
      return null
    }
  }

  let id = item.id // the id of the cart with the item
  let product_id = item.product_id
  const handleIncreaseQuantity = async(e) => {
    e.preventDefault();

    if(quantity < 5) {
      setQuantity(quantity +=1)
    }

     let editItem = {
      id, user_id, product_id, quantity
    }
    console.log("handlesubmit", editItem, quantity)
    dispatch(updateCartThunk(editItem, id, user_id))
    setCount(count +=1)
  }

  const handleDecreaseQuantity = async(e) => {
    e.preventDefault();

    if(quantity > 1) {
      setQuantity(quantity -=1)
    }

     let editItem = {
      id, user_id, product_id, quantity
    }
    dispatch(updateCartThunk(editItem, id, user_id))
    setCount(count + 1)

  }

  const handleDeleteCartItem = async(e) => {
    e.preventDefault();
    dispatch(deleteCartItem(item.id, user_id));
    setCount(count + 1)

  }


if(!item) {
  return null
}


  // console.log("item in cart item", item)

  return (
    <div className="each-cart-item-container">

      <div className="cart-item-header">
        {getProductTitle(item?.product_id)}
      </div>
      <div>
        ${item?.products?.price}
      </div>
      {
        item.id && user_id == item.user_id &&
        <>
        <form>
          <div className="cart-item-menu">

            <label>
                <input
                  className="quantity"
                  type="number"
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
            </label>

            <button
            className="cart-item-button"
              onClick={handleIncreaseQuantity}
            >
              <i className="fas fa-plus-square"></i>
            </button>

            <button
            className="cart-item-button"
              onClick={handleDecreaseQuantity}
            >
              <i className="fas fa-minus-square"></i>
            </button>

            <button
              className="cart-item-button"
              onClick={handleDeleteCartItem}
            >
              <i className="fas fa-trash-alt"></i>
            </button>

          </div>
        </form>
        <hr></hr>
        </>


      }



      </div>
  )
}

export default CartItem;
