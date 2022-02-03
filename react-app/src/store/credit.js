
const LOAD_CREDIT = "credit/LOAD_CREDIT";

const loadCredit = (credit) => ({
  type: LOAD_CREDIT,
  credit
})

// thunk to get one credit
export const getCredit = (user_id) => async(dispatch) => {
  if(user_id) {
    console.log("hit credit thunk user_id", user_id)
    const res = await fetch (`/api/credits/user/${user_id}`)
    const credit = await res.json();
    console.log("res credittttttttt", credit)
    dispatch(loadCredit(credit))
  }
}

const initialState = {};
const creditReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CREDIT: {
      return { ...state, ...action.credit};
    }
    // case EDIT_ADDRESS:
    //   return { ...state, [action.updatedUserAddress.id]: action.updatedUserAddress };

    // case ADD_ADDRESS : {
    //   if(!state[action.userAddress.id]) {
    //     const newState = {
    //       ...state,
    //       [action.userAddress.id]: action.userAddress
    //     }
    //     return newState
    //   }
    // }

    default:
      return state;
  }
}

export default creditReducer
