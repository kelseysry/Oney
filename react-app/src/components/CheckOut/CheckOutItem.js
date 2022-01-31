import { useState, useEffect } from 'react';
import './CheckOut.css'
import ItemQuantity from './ItemQuantity';

const CheckOutItem = ({item, user_id, count, setCount}) => {

  console.log("item", item)

  const imgObj = Object.values(item.products.images)[0]
  const imgUrl = Object.values(imgObj)


  return (
    <>

    <section className="cart-item-container">

      <div className="cart-img-container">
        <img className="cart-item-img-checkout" src={imgUrl} />
      </div>
      <div>
        <div className="cart-item-header">
          {item.products.title}
        </div>
        <div className="cart-item-quantity">
          <ItemQuantity item={item} count={count} setCount ={setCount}/>
        </div>
      </div>


    </section>


    </>
  )

}

export default CheckOutItem
