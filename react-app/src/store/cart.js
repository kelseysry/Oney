// export const getCartItems = (state) => {
//   return Object.values(state.cart.order)
//     .map(id => ({
//       ...state.cart[id],
//       ...state.product[id],
//     }));
// };

const ADD_TO_CART = 'cart/addToCart';
const REMOVE_FROM_CART = 'cart/removeFromCart';
const UPDATE_COUNT = 'cart/updateCount';
const PURCHASE = 'cart/purchase';
const OPEN_CART = 'cart/openCart';
const CLOSE_CART = 'cart/closeCart';
const LOAD_ALL_CART_ITEMS = 'cart/loadAllCartItems';
const CLEAR = 'cart/CLEAR'
const PURCHASE_FROM_CART = 'cart/PURCHASE'

export const clearCartItems = () => ({
  type: CLEAR
})

// action creator to add to cart
export const addToCart = (newCartItem) => ({
  type: ADD_TO_CART,
  newCartItem,
});

// action creator to get all cart items
const loadAllCartItems = (cartItems, user_id) => ({
  type: LOAD_ALL_CART_ITEMS,
  cartItems,
  user_id
})

const editItemAction = (editedItem, id) => ({
  type: UPDATE_COUNT,
  payload: {
  editedItem,
  id
  }
})

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

export const purchaseFromCart = (id) => ({
  type: PURCHASE_FROM_CART,
  id,
});



export const updateCount = (id, count) => ({
  type: UPDATE_COUNT,
  id,
  count,
});

export const purchase = () => ({
  type: PURCHASE,
});

export const openCart = () => ({
  type: OPEN_CART,
});

export const closeCart = () => ({
  type: CLOSE_CART,
});

// thunk to add to cart
export const addToCartThunk = (item, user_id) => async (dispatch) => {
  const response = await fetch(`/api/carts/${user_id}/items`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      item
    )
  });
  console.log("item in thunk", item)
  console.log("user_id in thunk", user_id)

  try {
    const newCartItem = await response.json();
    // console.log("newCartItem", newCartItem)
    await dispatch(addToCart(newCartItem))
    // dispatch(openCart())

    console.log("newCartItem in thunk", newCartItem)
    return newCartItem

  } catch(error) {
    console.log(error)
  }

}

// thunk to remove an item in the cart completely
export const deleteCartItem = (id, user_id) => async(dispatch) => {

  console.log("hit delete thunk - item.id",id)

  if(id) {
  const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
    method: 'DELETE',
  });


  if(response.ok) {
    dispatch(removeFromCart(id))
  }
} else {
  return null
}
}


export const purchaseCart = (id, user_id) => async(dispatch) => {

  console.log("hit delete thunk - item.id",id)

  if(id) {
  const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
    method: 'DELETE',
  });


  if(response.ok) {
    dispatch(purchaseFromCart(id))
  }
} else {
  return null
}
}


// takes care of deleting and adding existing quantity of item
// thunk to update cart // works!! :)
export const updateCartThunk = (editItem, id, user_id) => async(dispatch) => {

  const response = await fetch(`/api/carts/${user_id}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editItem)
  });

  console.log("editItem in thunk", editItem)


  const editedItem = await response.json();

  console.log("editedItem in thunk", editedItem)
  dispatch(editItemAction(editedItem, id))
  return editedItem
}

// thunk to get all cart items
export const allCartItemsThunk = (user_id) => async(dispatch) => {

  if(user_id) {
    console.log("user_id in thunk", user_id)
    const res = await fetch(`/api/carts/${user_id}`)
    const cartItems = await res.json();
    console.log("allCartItemsThunk", cartItems)
    dispatch(loadAllCartItems(cartItems, user_id))
  }

}

export default function cartReducer(state = {showCart: false }, action) {
  switch (action.type) {

    case ADD_TO_CART: {
      const newState = {...state}
      newState.showCart = true
      newState[action.newCartItem.id] = action.newCartItem // new "cart_item" added to list of cart items
      console.log("newState in cart reducer for add_to_cart", newState)
      return newState
      };

    case REMOVE_FROM_CART: {
      const newState = { ...state};
      delete newState[action.id];
      return newState;
    }

    case UPDATE_COUNT:
      if (action.count > 0) {
        return {
          ...state,
          [action.id]: {
            id: action.id,
            count: action.count,
          },
        };
      } else {
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      }

    case OPEN_CART:
      return {
        ...state,
        showCart: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        showCart: false,
      };                              // backend format for get all cart items
    case LOAD_ALL_CART_ITEMS: { // {cartItem.id: cartItem.to_dict() for cartItem in cartItems}
      const newState = {...state};
      for (const[key,value] of Object.entries(action.cartItems)) {
        newState[key] = value
      }
      return newState
    };
    case CLEAR:{
      return {}
    };
    case PURCHASE_FROM_CART: {
      return {showCart: false }
    };

    default:
      return state;
  }
}
