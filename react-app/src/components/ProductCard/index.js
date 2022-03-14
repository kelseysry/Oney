import './ProductCard.css'
import { NavLink } from 'react-router-dom';
import pictures from '../../data/picture';
import React, { useEffect, useState } from 'react';
import ProductRating from './ProductRating';

const ProductCard = ({id,price,images,title}) => {

    const [ratings, setRatings] = useState([])

    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`/api/products/${id}/ratings`);
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

    let image = images[0]?.url_570xN

        return (
        <>
            {image ?

                <div className="prod">
                <NavLink to={`/products/${id}`}>
                    <div className='product_card'
                    style={{
                        backgroundImage: `url("${pictures.collection[9].imageUrl}")`
                     }}>

                        <img className= 'productImage' src={image} alt="Product"/>
                        <span className='productTitle'>{title}</span>
                        <span className='productPrice'>${price}</span>
                        {<ProductRating average={average} ratings={ratings}/>}
                    </div>
                </NavLink>
                </div>
                : null
            }
        </>

            );


        }
    // return null
//};

export default ProductCard;
