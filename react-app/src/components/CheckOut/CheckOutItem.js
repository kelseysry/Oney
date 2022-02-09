import { useState, useEffect } from 'react';
import './CheckOut.css'
import ItemQuantity from './ItemQuantity';
import pictures from '../../data/picture';

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
      <div className="cart-item-header-quantity-container">
        <div className="cart-item-header">
          {item.products.title}
        </div>
        <div className="cart-item-quantity">
          <ItemQuantity item={item} count={count} setCount ={setCount}/>
        </div>
      </div>
    </section>

      {/* <hr className="cart-page-hr"></hr> */}
      <div className='leaf-hr-container'>
        <img className="leaf-hr" src={pictures.collection[8].imageUrl} />        <img className="leaf-hr" src={pictures.collection[8].imageUrl} />
      
      </div>

    </>
  )

}

export default CheckOutItem
