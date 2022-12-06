import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

const Shopcart = () => {
    // imported states
    const { idState } = useOutletContext();
    const { productsState } = useOutletContext();
    const { shopCartState } = useOutletContext();
    const { shopCartIdState } = useOutletContext();
    const { currentToken } = useOutletContext();
    const { checkoutDataState } = useOutletContext();
    const [userId, setUserId] = idState;
    const [products, setProducts] = productsState;
    const [pendingOrders, setPendingOrders] = shopCartState;
    const [shopCartId, setShopCartId] = shopCartIdState;
    const [checkoutData, setCheckoutData] = checkoutDataState;
    const navigate = useNavigate();

    // states created to set product id, quantity and error for an error message + total num variable
    const [currentProductId, setCurrentProductId] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [newError, setNewError] = useState("");
    let totalNum = 0

    
    async function fetchUpdatedCartItems() {
        try {
            const response = await fetch(`https://project-09-backend.onrender.com/api/shopcart/${userId}/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    cartStatus: "standby"
                })
            })
            const data = await response.json();
            setPendingOrders(data);
        } catch (error) {
            console.error(error)
        }
    }

    
    // edits a products quantity
    async function changeProductQuantity(event) {
        event.preventDefault();
        try {
            const response = await fetch(`https://project-09-backend.onrender.com/api/shopcart/${shopCartId}/quantity`, {
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
            fetchUpdatedCartItems();
        } catch (error) {
            console.error(error)
        }
    };

    // removes product from order, hard deleting it from cart items
    async function removeProductFromOrder(event) {
        event.preventDefault();
        try {
            const response = await fetch(`https://project-09-backend.onrender.com/api/shopcart/${shopCartId}/remove`, {
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
            fetchUpdatedCartItems();
        } catch (error) {
            console.error(error)
        }
    };

    // changes cart status to processed, 
    // then if a success message is returned the user is naviagted to a success page or else an error message displays
    async function checkOutFunc(event) {
        event.preventDefault();
        try {
            const response = await fetch(`https://project-09-backend.onrender.com/api/shopcart/${shopCartId}/status`, {
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
                setCheckoutData(data)
            } else {
                setNewError(data.name)
            }

        } catch (error) {
            console.error(error)
        }
    };

    // updates the product id, used for both edit and deleting products
    function updateProductId(event){
        setCurrentProductId(event.target.value)
    }

    // updates quantity to the value of a drop down select option
    function updateQuantity(event){
        setCurrentQuantity(event.target.value)
    }

    return (
        <div> { currentToken && !!currentToken.length ?
            <div>
                <h1>Your Cart</h1>
                    {/* Maps through pending orders */}

                    {pendingOrders && !!pendingOrders.length ? pendingOrders.map((order, idx) => {
                        {totalNum += order.quantity * order.priceBoughtAt}

                        // finds the id of a product from the product state that matches the productid on the current order being mapped
                        // this is so a product name can be displayed
                        const matchingProduct = products.find((element) => {
                        return order.productId == element.id })
                        return <div key={idx}>
                            <form onSubmit={changeProductQuantity}>
                                <h3>{matchingProduct.name}</h3>
                                <p>Price: ${order.priceBoughtAt}</p>
                                <p>Quantity: {order.quantity}</p>
                                <select onChange={updateQuantity}>Change Quantity
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                <button value={order.productId} onClick={updateProductId} type="submit">Update</button>
                            </form>
                            <br/>
                            <form onSubmit={removeProductFromOrder}>
                                <button type="submit" value={order.productId} onClick={updateProductId}>Remove item from cart</button>
                            </form>
                        </div>
                    }) : null}

                <div>
                    <br />
                    <p>Shipping and handling: <b>FREE!</b></p>
                    <b>Total: ${(totalNum).toFixed(2)}</b>
                </div>

                <div>
                    <form onSubmit={checkOutFunc}>Enter shipping info
                        <div id="address-form">
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
                        <input type="tel" maxLength="4" minLength="4" pattern="[0-9]{4}" placeholder="Expiration Date" required/>
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