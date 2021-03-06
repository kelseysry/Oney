import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneProduct, deleteProduct, clearProducts} from '../../store/product'
import './singleProduct.css'
import '../CreateReview/Review.css'
import HideReviewForm from '../HideReviewForm';
import { updateCartThunk,addToCartThunk, allCartItemsThunk } from '../../store/cart';

import { openCart, closeCart } from '../../store/cart';
import ProductRating from '../ProductCard/ProductRating';

function SingleProductPage({count, setCount, open, setOpen}){
    const history = useHistory();
    const dispatch = useDispatch()
    const cartItem = {};
    const showCart = useSelector((state) => state.cart.showCart);

    const productObject = useSelector((state)=>state.product)
    const indProjObj = Object.values(productObject)[0]
    const productImgsObj = Object.values(productObject)[0]
    const sessionUser = useSelector((state) => state.session.user);
    const {productId} = useParams()

    const user_id = sessionUser?.id

    const cartItemsObj = useSelector((state)=>state.cart.allCartItems)


    const [allProducts, setAllProducts] = useState([])
    const allProductsArr = Object.values(allProducts)


    let cartItems;
    if(cartItemsObj) {
        cartItems = Object.values(cartItemsObj)
    }

    let [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(allCartItemsThunk(user_id))
        return () => clearInterval(allCartItemsThunk(user_id));
      }, [dispatch, user_id, cartItems?.length, count, productId, open])


      useEffect(() => {
        async function fetchData() {
          const response = await fetch(`/api/products/cart/${user_id}`)
          const allProductsList = await response.json()

          setAllProducts(allProductsList);
        }
        fetchData();
      },[allProductsArr.length, count])


      const [ratings, setRatings] = useState([])

      useEffect(() => {
          async function fetchData() {
            const response = await fetch(`/api/products/${productId}/ratings`);
            const responseData = await response.json();
            setRatings(responseData);
          }
          fetchData();
        }, []);

        let productRatings;
        if(ratings) {
            productRatings = Object.values(ratings)

        }

      let average = Math.floor(productRatings.reduce((a,b) => a+b, 0)/ productRatings.length)

        console.log("average", average)



    const [largeSelectedImg, setLargeSelectedImg] = useState(0);


    const handleDelete = async(productId) => {
        await dispatch(deleteProduct(productId));
        history.push('/')
    }

    const handleAddCartNonUser = async () => {
        history.push('/login')
    }

    useEffect(()=>{
        dispatch(getOneProduct(productId))
        dispatch(clearProducts())
    }, [dispatch,productId, open])


    const product = Object.values(productObject)
    if (!product.length) return null

    const prodImgsArr = Object.values(productImgsObj?.images)


     // grouping of images
    const imageGroupsArr = prodImgsArr?.map((obj) => {
        return Object.values(obj)
    })

    // get array of the second image in each grouping
    let images = imageGroupsArr?.map((arr) => {
        if (arr.length > 2) {
            return arr[1]
        } else {
            return arr[0]
        }
    })

    const checkCartItemQuantity = (productId) => {
        const toBeCartItem = cartItems?.filter(function(el){
            return el.product_id == productId
        });
        return toBeCartItem
    }

    const handleAddToCart = () => {
        let product_id = +productId

        if(checkCartItemQuantity(product_id).length) {
         // item exists in user's card already then we should  update
        let currentItem = checkCartItemQuantity(product_id)
        let quantity = currentItem[0]?.quantity
        let id = currentItem[0]?.id

        if(quantity < 5) {
            quantity += 1
        }

        let editItem = {
            id, user_id, product_id, quantity
        }
        dispatch(updateCartThunk(editItem, id, user_id)).then(()=>dispatch(openCart()))
        setCount(count +=1)

        } else {
            setCount(count+1)
            setOpen(true)

            let quantity =1
            const itemAddToCart = {
                user_id, product_id,quantity
            }

            let waitAddProduct = dispatch(addToCartThunk(itemAddToCart, user_id))
            if(waitAddProduct) {
                dispatch(allCartItemsThunk(user_id)).then(()=>dispatch(openCart()))
            }
        }
    }

    return(
        <div>
            <div className='mainImagesBox'>
                <div className='smallImagesBox'>
                    {images.length ?
                        images?.map((imageUrl, idx) =>
                            <div key={idx}>
                                <img src={imageUrl} alt='product photos' className='smallImg'
                                onClick={() => setLargeSelectedImg(idx)}></img>
                            </div>
                        ) : null
                    }
                </div>
                <div className='largeImageBox'>
                    <img src={images[largeSelectedImg]} alt='product photos' id='largeImage' className='largeImage'></img>
                </div>
                <div className='itemInfoBox'>
                    <div>
                        <h1 className='productTitle1 descriptionDiv'>
                            {product[0]?.title}
                        </h1>
                    </div>
                    <div>
                        <p className='singleProductPrice'>${product[0]?.price}</p>
                    </div>
                    <div className='single-rating-page'>
                        {<ProductRating average={average} ratings={ratings}/>}
                    </div>
                    <div className='descriptionDiv'>
                        <p className='descriptionTitle'>Description</p>
                        <p className='productDescParagraph'>
                            {product[0]?.description}
                        </p>
                        <div className='shippingInfo'>
                            <p>Cost to ship: Free</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            {sessionUser &&
                                <button id='addToCartBtn'
                                    className={(cartItem ? " selected" : "")}
                                    onClick={handleAddToCart}
                                    >
                                    Add to Cart
                                </button>
                            }
                        </div>
                        {!sessionUser &&
                            <button onClick={() => handleAddCartNonUser()} className='submitBtn' >
                                Add to Cart
                            </button>
                        }
                    </div>
                    <div className='singleProdBottomBtnsDiv'>
                        <div className='singleProdUpdateDiv updateProductBtnDiv'>
                            {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                                <NavLink to={`/products/${productId}/edit`} className='updateProdButton'>Update</NavLink>
                            }
                        </div>
                        {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                            <button onClick={() => handleDelete(indProjObj?.id)} className='delButton '>Delete Product</button>
                        }
                    </div>
                </div>
            </div>
            <div className='reviewsAndDescriptionsDiv'>
                <div className='reviewsDiv'>
                    <HideReviewForm />
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage
