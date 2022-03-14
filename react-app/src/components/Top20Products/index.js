import { useDispatch, useSelector } from "react-redux";
import {getTop20Products,clearProducts} from "../../store/product"
import ProductCard from '../ProductCard'
import './Top20Products.css'
import pictures from "../../data/picture";
import React, { useEffect, useState } from 'react';

const Top20Products = () => {
    const products = useSelector((state)=> Object.values(state.product))

    const dispatch = useDispatch();

    // const [ratings, setRatings] = useState([])

    useEffect(()=>{
        dispatch(getTop20Products())
        dispatch(clearProducts())
    },[dispatch])

    // useEffect(() => {
    //     async function fetchData() {
    //       const response = await fetch(`/api/products/${id}`/ratings);
    //       const responseData = await response.json();
    //       setRatings(responseData);
    //     }
    //     fetchData();
    //   }, []);


    if (!products){
        return null
    }
    else {
        return (
            <div>

                <img className="nameTag" src={pictures.collection[12].imageUrl} />

                <div className='topProducts'>
                    {products?.map(({id,price,images,title})=>(
                        <ProductCard
                            key={id}
                            id={id}
                            price={price}
                            images={images}
                            title={title}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Top20Products;
