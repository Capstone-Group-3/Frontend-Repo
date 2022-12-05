import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const Products = () => {
    const { productsState } = useOutletContext();
    const [products, setProducts] = productsState;

    return (
        <div>
            { // is active check
                products && products.length ? products.map((eachProduct, idx) => {
                    return <div key={idx}>
                        <h2>{eachProduct.name}</h2>
                        <Link to={`/products/${eachProduct.id}`}>Click here to see more</Link>
                    </div>
                }): null
            }
        </div>
    )
};

export default Products;