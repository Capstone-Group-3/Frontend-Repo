import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {

    // this is new -- products state as a destructured object instead of array, because pagecontext is an object
    const { productsState } = useOutletContext();
    const [products, setProducts] = productsState;

    const [detailedSpecificProduct, setDetailedSpecificProduct] = useState({})

    const [toggleProductDetailsForm, setToggleProductDetailsForm] = useState(false)

    const { id } = useParams();

    // const thisProduct = products.find((element) => {
    //     return id == element.id
    // });

    // console.log(" find description: ", thisProduct.description)
    // console.log("this product find func: ", thisProduct)

    function handleToggleProductDetailsForm () {
        setToggleProductDetailsForm (!toggleProductDetailsForm);
    }
// if currenttoken 
// display button to add to cart 

// else if localStorage thing
// display different button

// else "message: please log in to purchase ${detailedspecificproduct.name}"
    
    useEffect(() => {
        // removed the async and await because it's not an call or anything, it's filtering through the product data which we already have
        function findSpecificProduct () {
                const [specificProduct] = products.filter((element) => element.id == id);
                setDetailedSpecificProduct(specificProduct)};
        findSpecificProduct()
        console.log("specific product: ", detailedSpecificProduct)
    }, []) 

    console.log("description: ", detailedSpecificProduct.description)

    return (
        <div>
            {/* { thisProduct.isActive ? // extra check in case someone uses a route to go to an inactive product
                <div>
                    <h2>{thisProduct.name}</h2>
                    <h3>{thisProduct.price}</h3>
                    <h4>{thisProduct.description}</h4>
                    <Link to="products">Browse more products</Link>
                </div>
                 : null } */}

            <button onClick ={handleToggleProductDetailsForm}>Product Details</button>
            {   // setting products here is probably not what we want to do, because products/setproducts is what we get from our api on the homepage
                toggleProductDetailsForm ? <ProductDetails indivProduct={detailedSpecificProduct} setProducts = {setProducts}
                handleToggleProductDetailsForm= {handleToggleProductDetailsForm}/>: null
            }

            <div>
                <h3>Product Details:</h3>
                {   // not title on detailed specific product, there's a name though 
                    detailedSpecificProduct.isActive ? 
                    <div>
                        <p>{detailedSpecificProduct.name}</p>
                        <p>{detailedSpecificProduct.description}</p> 
                        <p>{detailedSpecificProduct.price}</p>
                    </div> : <p>Untitled Product</p>
                }
            </div>
        </div>
    )
}

export default ProductDetails;