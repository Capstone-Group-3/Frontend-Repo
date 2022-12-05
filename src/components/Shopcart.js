import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Shopcart = () => {
    const { idState } = useOutletContext();
    const { productsState } = useOutletContext();
    const { shopCartState } = useOutletContext();
    const { shopCartIdState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const [userId, setUserId] = idState;
    const [products, setProducts] = productsState;
    const [pendingOrders, setPendingOrders] = shopCartState;
    const [shopCartId, setShopCartId] = shopCartIdState;
    const navigate = useNavigate();

    const [currentProductId, setCurrentProductId] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [newError, setNewError] = useState("");


    // FUNCTIONS:
        // calculating total

    // drop down to change quantity
    // button to remove item from cart
    // calculates total
    // Some method that verifies everything in payment info as "accurate" and/or saves it before it takes you to a success page

    useEffect(() => {
        function addTotal() {
            // add up total from quantity and price bought at, invoked whenever the quantity changes or something is deleted
        }
    }, [currentQuantity, currentProductId]);
    

    async function changeProductQuantity(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopCartId}/quantity`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    productId: currentProductId,
                    quantity: currentQuantity
                })
            })
            const data = await response.json();
        } catch (error) {
            console.error(error)
        }
    };

    async function removeProductFromOrder(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopCartId}/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    productId: currentProductId
                })
            })
            const data = await response.json();
        } catch (error) {
            console.error(error)
        }
    };

    async function checkOutFunc(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3030/api/shopcart/${shopCartId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    cartStatus: "processed"
                })
            })
            const data = await response.json();

            if (data.success) {
                navigate("/successpage")
            } else {
                setNewError(data.name)
            }

        } catch (error) {
            console.error(error)
        }
    };


    return (
        <div> { currentToken && !!currentToken.length ?
            <div>
                <h1>Your Cart</h1>
                    {pendingOrders.map((order, idx) => {
                        const matchingProduct = products.find((element) => {
                        return order.productId == element.id })
                        return <div key={idx}>
                            <h3>{matchingProduct.name}</h3>
                            <p>Price: ${order.priceBoughtAt}</p>
                            <p>Quantity: {order.quantity}</p>
                        </div>
                    })}

                <div>
                    <br />
                    <p>Shipping and handling: <b>FREE!</b></p>
                    <b>Total: $100</b>
                </div>

                <div>
                    <form onSubmit={checkOutFunc}>Enter shipping info
                    {/* Comment all the inputs out for testing and just leave the button to save time */}
                        {/* <div id="address-form">
                            <input type="text" placeholder="Name" required/>
                            <br/>
                            <input type="text" placeholder="Street" required/>
                            <input type="text" placeholder="City" required/>
                            <input type="text" placeholder="State" maxlength="2" required/>
                            <input type="tel" inputMode="numeric" placeholder="Zip Code" maxlength="5" required/>
                            <input type="text" placeholder="Country" required/>
                        </div>
                        <br/>
                        <label>Enter payment info</label>
                        <br />
                        <input type="tel" minLength="16" maxLength="16" placeholder="Card Number" required/>
                        <input type="tel" maxLength="4" minLength="4" pattern="[0-9]{4}" placeholder="Expiration Date" required/> */}
                        <input type="tel" pattern="[0-9]{3}" maxLength="3" minLength="3" placeholder="CVV" required/>
                        <br/>

                        <button type="submit">Checkout</button>
                    </form>
                </div>

                {newError && !!newError.length ?
                    <div>
                        <p>{newError}</p>
                    </div>
                : null}

                <Link to="/products">Browse more items</Link>
            </div> : 

            <div>
                <p>Looks like you don't have an account</p>
                <Link to="/login">Log in or register here!</Link>
            </div>
            }
        </div>
    )
};

export default Shopcart;