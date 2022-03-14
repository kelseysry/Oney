import React, { useEffect, useState } from 'react';
import './ProductCard.css'

const ProductRating = ({average, ratings}) => {

  const [loaded, setIsLoaded] = useState(false)


  useEffect(() => {
    setIsLoaded(true);
  }, [ratings]);

console.log("ratings", average)

return (
  <>
    {
      loaded?
      <div className='product-ratings'>
        {average ? Array(average).fill(<i className="fas fa-star"></i>).map((ele, idx) => <span key={idx}>{ele}</span>) : null}
      </div>
      : null
    }
  </>
)

}
export default ProductRating
