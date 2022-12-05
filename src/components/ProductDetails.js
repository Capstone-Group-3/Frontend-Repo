import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { productsState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const { idState } = useOutletContext();
    const { shoppingSessionState } = useOutletContext();
    const { shopCartIdState } = useOutletContext();
    const [products, setProducts] = productsState;
    const [userId, setUserId] = idState;
    const [shoppingSessionData, setShoppingSessionData] = shoppingSessionState;
    const [shopCartId, setShopCartId] = shopCartIdState;
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");

    const [detailedSpecificProduct, setDetailedSpecificProduct] = useState({})

    const [toggleProductDetailsForm, setToggleProductDetailsForm] = useState(false)

    const { id } = useParams();
    
    useEffect(() => {
        function findSpecificProduct () {
                const [specificProduct] = products.filter((element) => element.id == id);
                setDetailedSpecificProduct(specificProduct)};
        findSpecificProduct();
    }, []) 

    async function addProductToCart(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopCartId}/add`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity
                })
            })
            const data = await response.json();
            console.log("prod details data: ", data)
            setSuccessMessage(data.message);
            setShoppingSessionData(data)
        } catch (error) {
            console.error(error)
        }
    }

    function updateQuantity(event) {
        setQuantity(event.target.value)
    };

    return (
        <div>
            <div>
                {  detailedSpecificProduct.isActive ? // extra check in case someone uses a route to go to an inactive product
                    <div>
                        <p>{detailedSpecificProduct.name}</p>
                        <p>{detailedSpecificProduct.description}</p> 
                        <p>{detailedSpecificProduct.price}</p>

                    {currentToken && !!currentToken.length ? 
                        <form onSubmit={addProductToCart}>Add to cart
                            <select onChange={updateQuantity} required>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <button type="submit">Submit</button>
                        </form>
                    : null}

                    {successMessage && !!successMessage.length ?
                        <p>{successMessage}</p>
                    : null }

                        <Link to="/products">Browse more products</Link>
                    </div>
                : null }
            </div>
        </div>
    )
}

export default ProductDetails;