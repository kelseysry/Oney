import styles from './ProductCardXL.module.css';
import { Link } from 'react-router-dom';
import pictures from '../../data/picture';
import ProductRating from '../ProductCard/ProductRating';
import React, { useEffect, useState } from 'react';

export default function ProductCardXL({ product }) {

  const [ratings, setRatings] = useState([])

  useEffect(() => {
      async function fetchData() {
        const response = await fetch(`/api/products/${product?.id}/ratings`);
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


  const imageUrl = product.images[0].url_570xN;
  return (
    <Link className={styles.link} to={`/products/${product.id}`}                     style={{
      backgroundImage: `url("${pictures.collection[9].imageUrl}")`
   }}>
      <figure className={styles.card}>
        <img
          className={styles.imageContainer}
          src={imageUrl}
          alt={product.title}
        />
        <figcaption>
          <div className={styles.productTitle}>
            {product.title}
          </div>
          <div className={styles.productInfo}>
            <span>{`$${product.price.toFixed(2)}`}</span>
          </div>
        </figcaption>
        <div className={styles.productRating}>
          {<ProductRating average={average} ratings={ratings}/>}
        </div>

      </figure>
    </Link>
  )
}
