import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "./css/emirProducts.css"

const Products = () => {
    const { productsState } = useOutletContext();
    const [products, setProducts] = productsState;
    const [activeProducts, setActiveProducts] = useState([]);

    useEffect(() => {
        const filteredProducts = products.filter(product => product.isActive == true);
        setActiveProducts(filteredProducts);
    }, [])

    return (
        <div>
            { // is active check
                activeProducts && activeProducts.length ? activeProducts.map((eachProduct, idx) => {
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