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
        <div className="bigletters">
            { // is active check
                activeProducts && activeProducts.length ? activeProducts.map((eachProduct, idx) => {
                    return <div key={idx}>
                      <div className="allproducts">
                        <h2>{eachProduct.name}</h2>
                        <img src={eachProduct.image} alt="product-image" height="80" width="80"/>
                        <Link className="products-link"to={`/products/${eachProduct.id}`}>Click here to see more</Link>
                        </div>
                    </div>
                }): null
            }
        </div>
    )
};

export default Products;