import React from "react";
import { Link, useOutletContext } from "react-router-dom";
// probably also import a separate component for product details using parameters

// add to navbar tomorrow 
const Products = () => {
    const { productsState } = useOutletContext();
    const [products, setProducts] = productsState;

    return (
        <div>
            {
                products && products.length ? products.map((eachProduct, idx) => {
                    return <div key={idx}>
                        <h2>{eachProduct.name}</h2>
                        <h4>{eachProduct.price}</h4>
                        <p>{eachProduct.description}</p>
                        {/* Link here to product details */}
                    </div>
                }): null
            }
        </div>
    )
};

export default Products;