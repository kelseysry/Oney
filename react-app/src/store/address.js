const LOAD_ADDRESS = "address/LOAD_ADDRESS";
const EDIT_ADDRESS = "address/EDIT_ADDRESS"

// action creator load user's address
const loadAddress = (address) => ({
  type: LOAD_ADDRESS,
  address
});

const editUserAddressAction = (updatedUserAddress) => ({
  type: EDIT_ADDRESS,
  updatedUserAddress
});

// thunk to get one address
export const getAddress = (user_id) => async(dispatch) => {
  if (user_id) {
    const res = await fetch(`/api/addresses/user/${user_id}`)
    const address = await res.json();
    dispatch(loadAddress(address))
  }
}

// thunk to edit address
export const editAddress = (editUserAddress, user_id) => async dispatch => {
  const response = await fetch(`/api/address/user/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editUserAddress)
  });

  const updatedUserAddress = await response.json();
  dispatch(editUserAddressAction(updatedUserAddress))
  return updatedUserAddress
}


// reducer
const initialState = {};
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADDRESS: {
      return { ...state, ...action.address};
    }
    case EDIT_ADDRESS:
      return { ...state, [action.updatedUserAddress.id]: action.updatedUserAddress };
      
    // case ADD_ONE : {
    //   if(!state[action.newReview.id]) {
    //     const newState = {
    //       ...state,
    //       [action.newReview.review.id]: action.newReview.review
    //       // because youre sending a key value pair back from the backend, return {"review":review.to_dict()}  when you dispatch that action.newReview is that key value pair.  needing to be dotted into one further
    //     }
    //     return newState
    //   }
    // }

    // case EDIT_ONE_REVIEW: {
    //   if(!state[action.review]) {
    //     const newState = {
    //       ...state, [action.review.id]: action.review
    //     };

    //     return newState
    //   }
    //   return state
    // }

    default:
      return state;
  }
}

export default addressReducer
