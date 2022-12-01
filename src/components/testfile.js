import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {

    // this is new -- products state as a destructured object instead of array, because pagecontext is an object
    const { productsState } = useOutletContext();
    const { idState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const [userId, setUserId] = idState;
    const [products, setProducts] = productsState;
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    const { id } = useParams();

    const thisProduct = products.find((element) => {
        return id == element.id
    });

    // discrepancy on backend, sends success message even though it doesn't work when inventory is off. It blocks it intentionally, we just need to send a different message

    async function addProductToCart(event) {
        event.preventDefault();

        // problem potentially because the shop cart id only corresponds to the user id now because we only have 3 people.
        // So for me (userid 2), I have shopping cart 2. and so on for everyone else
        // If we get more users and more carts it becomes out of sync
        // I may have placed 10 orders and now my current cart is 10, but we have no real variable or way to access that from the front end or this route?
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${userId}/add`, {
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
            setSuccessMessage(data.message)
        } catch (error) {
            console.error(error)
        }
    }

    function updateQuantity(event) {
        setQuantity(event.target.value)
    };

    return (
        <div>
            { thisProduct.isActive ? // extra check in case someone uses a route to go to an inactive product
                <div>
                    <h2>{thisProduct.name}</h2>
                    <h3>{thisProduct.price}</h3>
                    <h4>{thisProduct.description}</h4>

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
    )
}

export default ProductDetails;