
const LOAD_CREDIT = "credit/LOAD_CREDIT";
const EDIT_CREDIT = "credit/EDIT_CREDIT"

const loadCredit = (credit) => ({
  type: LOAD_CREDIT,
  credit
})

const editUserCreditAction = (updatedUserCredit) => ({
  type: EDIT_CREDIT,
  updatedUserCredit
});

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

// thunk to edit credit
export const editCredit = (editUserCredit, user_id) => async(dispatch) => {
  const response = await fetch(`/api/credits/user/edit/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editUserCredit)
  });

  const updatedUserCredit = await response.json();
  dispatch(editUserCreditAction(updatedUserCredit))
  return updatedUserCredit
}

const initialState = {};
const creditReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CREDIT: {
      return { ...state, ...action.credit};
    }
    case EDIT_CREDIT:
      return { ...state, [action.updatedUserCredit.id]: action.updatedUserCredit };

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
