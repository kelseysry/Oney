import { useState, useEffect } from 'react';

const CheckOutItem = ({item, user_id}) => {

  const [allProducts, setAllProducts] = useState([])
  const allProductsArr = Object.values(allProducts)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/products/cart/${user_id}`)
      const allProductsList = await response.json()
      setAllProducts(allProductsList);
    }
    fetchData();
  },[allProducts])


  const getProductTitle = (item_id) => {
    const productTitle = allProductsArr.filter(function(el){
      return el.id === item_id
    });
    if (getProductTitle) {
      return productTitle[0]?.title
    }
    else {
      return null
    }
  }

  return (
    <>
    <div className="cart-item-header">
        {getProductTitle(item?.product_id)}
    </div>

    </>
  )

}

export default CheckOutItem
