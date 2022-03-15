import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { createOneReview } from "../../store/review";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import './Review.css'

// need to add hideForm and hideButton inside of SingleProductPage
const ReviewForm = ({hideForm, hideButton}) => {

  const [content, setContent] = useState('');
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState([])


  const dispatch = useDispatch();

  const {productId} = useParams();
  const product_id = productId

  const sessionUser = useSelector((state) => state.session);

  const user_id = sessionUser?.user.id

  useEffect(() => {
    const validationErrors = [];
    if(!rating) validationErrors.push("Rating is required")
    if(rating > 5 || rating < 1) validationErrors.push("Rating must be between 1-5")
    if(!content) validationErrors.push("Please write a review!")

    setErrors(validationErrors)

  },[content,rating,product_id,user_id])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newReview = {
      content,rating,product_id,user_id
    }


    let createdReview = await dispatch(createOneReview(newReview, product_id))

    if (createdReview) {
      hideForm();
    }
  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    hideForm();
    hideButton();
  }

  const handleClick = () => {
    if(rating === 1) {
      setRating(0);
    }
  }



  return (
    <>
        <form className="submit-review" onSubmit={handleSubmit}>

          {/* <label>
              <input
                type="number"
                placeholder="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
              </input>
          </label> */}

          <div className="ratings-hover">
          {Array(5).fill(<i className="fas fa-star fa-2x"></i>).map((ele, idx) => {
            idx += 1;
            return (
              <button
                key={idx}
                className={idx <= (hover || rating) ? "color" : "noColor"}
                onClick={() => {
                  setRating(idx)
                  handleClick()

                }}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className={idx <= (hover || rating) ? "color" : "noColor"}><i className="fas fa-star fa-2x"></i> </span>
              </button>
            );
          })}
        </div>


          <label>
              <input
                className='review-container'
                placeholder="give an honest review about the product!"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </input>
          </label>

          <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <span className="submit-review">
          <button className="submit-cancel-review-button" type="submit" disabled={errors.length>0} >Submit Review</button>
          </span>
          <span>
          <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
          </span>
        </form>
        </>
      )

    }


    export default ReviewForm
