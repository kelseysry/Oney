const LOAD_ADDRESS = "address/LOAD_ADDRESS";
const EDIT_ADDRESS = "address/EDIT_ADDRESS";
const ADD_ADDRESS = "address/ADD_ADDRESS";
// action creator load user's address
const loadAddress = (address) => ({
  type: LOAD_ADDRESS,
  address
});

const editUserAddressAction = (updatedUserAddress) => ({
  type: EDIT_ADDRESS,
  updatedUserAddress
});

const addAddress = (userAddress) => ({
  type: ADD_ADDRESS,
  userAddress
})

// thunk to get one address
export const getAddress = (user_id) => async(dispatch) => {
  if (user_id) {
    const res = await fetch(`/api/addresses/user/${user_id}`)
    const address = await res.json();
    dispatch(loadAddress(address))
  }
}

// thunk to edit address
export const editAddress = (editUserAddress, user_id) => async(dispatch) => {
  const response = await fetch(`/api/addresses/user/edit/${user_id}`, {
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

export const createAddress = (newUserAddress) => async(dispatch) => {
  console.log("newUserAddres thunk", newUserAddress)
  const response = await fetch(`/api/addresses/user/new/`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserAddress)
  });

  const userAddress = await response.json();
  dispatch(addAddress(userAddress))
  return userAddress

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

    case ADD_ADDRESS : {
      if(!state[action.userAddress.id]) {
        const newState = {
          ...state,
          [action.userAddress.id]: action.userAddress
        }
        return newState
      }
    }

    default:
      return state;
  }
}

export default addressReducer
