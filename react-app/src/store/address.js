





// thunk to edit address
export const editAddress = (editReview,product_id, id) => async dispatch => {
  const response = await fetch(`/api/address/${product_id}/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editReview)
  });

  const review = await response.json();
  dispatch(editReviewAction(review, id))
  return review
}
