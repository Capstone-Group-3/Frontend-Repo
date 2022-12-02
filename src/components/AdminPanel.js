import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";

const AdminPanel=()=>{
// ---------------Homepage States-------------
    const {usernameState} = useOutletContext()
    const {adminState} = useOutletContext() 
    const {currentToken} = useOutletContext()
    const {productsState} = useOutletContext()
// ---------------Admin Privledge States------------
    const [isAdmin, setIsAdmin] = adminState
    const [regUsers, setRegUsers] = useState([])
    const [targetedUser, setTargetedUser]= useState("")
// ----------------Product Target States------------
    const [products, setProducts] = productsState
    const [targetedProduct, setTargetedProduct]= useState("")
    const [isUsersToggled, setIsUsersToggled]=useState(false)
    const [isProductsToggled, setIsProductsToggled]=useState(false)
// ----------------Product Edit States-----------------------
    const [targetName, setTargetName]=useState("")
    const [targetDescription, setTargetDescription]=useState("")
    const [targetPrice, setTargetPrice]=useState(0)
    const [targetQuantity, setTargetQuantity]=useState(0)

    async function adminUser() {
        try {
            const response = await fetch("http://localhost:3030/api/users/setAdmin", {
                method: "PATCH",
                headers:{
                    "Content-Type":"application.json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    username: targetedUser
                })
            })
            const adminUserData =await response.json();
        } catch (error) {
            console.error
        }
    }

    async function deleteProduct() {
        try {
            const response = await fetch(`http://localhost:3030/api/products/${targetedProduct}`,{
                method: "DELETE",
                headers:{
                    "Content-Type":"application.json",
                    "Authorization":`Bearer ${currentToken}`
                }
            })
            const deletedProductData=await response.json()
        } catch (error) {
            console.error
        }
    }

    async function editProduct(event) {
        event.preventDefault()
        try {
            const response=await fetch(`http://localhost:3030/api/products/${targetedProduct}`,{
                method: "PATCH",
                headers:{
                    "Content-Type":"application.json",
                    "Authorization":`Bearer ${currentToken}`
                },
                body:JSON.stringify({
                    name: targetName,
                    description: targetDescription,
                    price: targetPrice,
                    quantity: targetQuantity
                })
            })
            const data= await response.json();
        } catch (error) {
            console.error
        }
    }

    async function makeProduct(){
    
        try {
            const response=await fetch(`http://localhost:3030/api/products`, {
                method: "POST",
                headers:{
                    "Content-Type":"application.json",
                    "Authorization":`Bearer ${currentToken}`
                },
                body:JSON.stringify({
                    name:targetName,
                    description: targetDescription,
                    price: targetPrice,
                    quantity: targetQuantity
                })
            })
            const data= await response.json();
        } catch (error) {
            console.error
        }
    }

    useEffect(() =>{
        async function getRegUsers() {
        try {
            const userGroup = await fetch("http://localhost:3030/api/users/nonAdmin", {
                headers: {
                    "Content-Type": "application.json",
                    "Authorization": `Bearer ${currentToken}`
                }   
            })
            const data = await userGroup.json();
            setRegUsers(data)
            console.log("this is the user data:", data)
        } catch (error) {
            console.error
        }}
        getRegUsers();
    }, [])

    async function promoteUser(event){
        setTargetedUser(event.target.value)
        await adminUser()
    }

    async function deactivateProduct(event){
        setTargetedProduct(event.target.value)
        await deleteProduct()
    }

    async function editTargetProduct(event){
        setTargetedProduct(event.target.value)
        await editProduct()
    }

    function updateTargetName(event){
        setTargetName(event.target.value)
    }

    function updateTargetDescription(event){
        setTargetDescription(event.target.value)
    }

    function updateTargetPrice(event){
        setTargetPrice(event.target.value)
    }

    function updateTargetQuantity(event){
        setTargetQuantity(event.target.value)
    }

    return (
        <div>
            {isAdmin?
            <div>
                <h2>Give Administrative Privledges</h2>
                <button onClick={(()=>setIsUsersToggled(!isUsersToggled))}>Show Users</button>
                    {isUsersToggled && regUsers.map((indivUser, idx)=>{
                        return <form onSubmit={promoteUser} key={idx}>
                            <p>{indivUser.username}</p>
                            <button type="submit" value={indivUser.name}>Promote</button>
                        </form>
                    })}
                {/* Have a toggle that displays all nonadmin users, with a 'promote' button*/}
                <h2>Edit Products</h2>
                <button onClick={(()=>setIsProductsToggled(!isProductsToggled))}>Show Products</button>
                    {isProductsToggled && products.map((indivProduct, idx)=>{
                        return <div key={idx}>
                                    <p>{indivProduct.name}</p>
                                    <form onSubmit={editTargetProduct}>
                                        <label>Name</label>
                                        <input value={targetName} onChange={updateTargetName}></input>
                                        <label>Description</label>
                                        <input value={targetDescription} onChange={updateTargetDescription}></input>
                                        <label>Price</label>
                                        <input value={targetPrice} onChange={updateTargetPrice}></input>
                                        <label>Quantity</label>
                                        <input value={targetQuantity} onChange={updateTargetQuantity}></input>
                                        <button type="submit" value={indivProduct.id}>Edit</button>
                                    </form>
                                    <form onSubmit={deactivateProduct}>
                                        <button type="submit" value={indivProduct.id}>Delete</button>
                                    </form>
                                </div>
                    })}
                <div>
                    <h2>Add a new Product</h2>
                    <form onSubmit={makeProduct}>
                        <label>Name</label>
                        <input value={targetName} onChange={updateTargetName}></input>
                        <label>Description</label>
                        <input value={targetDescription} onChange={updateTargetDescription}></input>
                        <label>Price</label>
                        <input value={targetPrice} onChange={updateTargetPrice}></input>
                        <label>Quantity</label>
                        <input value={targetQuantity} onChange={updateTargetQuantity}></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            :
            <div>
                <p>Ah ah ah, you didn't say the magic word</p>
                <img src='https://thumbs.gfycat.com/CapitalRigidGull.webp'></img>
            </div>
            }
        </div>
    )
}

export default AdminPanel