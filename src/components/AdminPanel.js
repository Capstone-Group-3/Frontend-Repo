import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";
import EditProduct from './EditProduct'

const AdminPanel=()=>{
    const navigate = useNavigate()
// ---------------Homepage States-------------
    const {usernameState, adminState, currentToken, productsState} = useOutletContext()
// ---------------Admin Privledge States------------
    const [isAdmin, setIsAdmin] = adminState
    const [regUsers, setRegUsers] = useState([])
    const [targetedUser, setTargetedUser]= useState("")
// ----------------Product Target States------------
    const [products, setProducts] = productsState
    
    const [isUsersToggled, setIsUsersToggled]=useState(false)
    const [isProductsToggled, setIsProductsToggled]=useState(false)
// ----------------Product Add States-----------------------
const [addProduct, setAddProduct]= useState(0)
const [addName, setAddName]=useState("")
const [addDescription, setAddDescription]=useState("")
const [addPrice, setAddPrice]=useState(0)
const [addQuantity, setAddQuantity]=useState(0)

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

    async function makeProduct(){
    const productInfo={}
    if (addName) {
        productInfo.name = addName
    };

    if (addDescription) {
        productInfo.description = addDescription
    };

    if (addPrice) {
        productInfo.price = addPrice
    };

    if (addQuantity) {
        productInfo.quantity = addQuantity
    };
        try {
            const response=await fetch(`http://localhost:3030/api/products`, {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${currentToken}`
                },
                body:JSON.stringify(productInfo)
            })
            const data= await response.json();
        } catch (error) {
            console.error(error)
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

    function handleInputChange(event, setter){
        setter(event.target.value)
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

                <h2>Edit Products</h2>
                <button onClick={(()=>setIsProductsToggled(!isProductsToggled))}>Show Products</button>
                    {isProductsToggled && products.map((indivProduct, idx)=>{
                        return <EditProduct key={idx} indivProduct={indivProduct}/>
                    })}
                <div>
                    <h2>Add a new Product</h2>
                    <form onSubmit={makeProduct}>
                        <label>Name</label>
                        <input value={addName} onChange={(e)=>handleInputChange(e, setAddName)}></input>
                        <label>Description</label>
                        <input value={addDescription} onChange={(e)=>handleInputChange(e, setAddDescription)}></input>
                        <label>Price</label>
                        <input value={addPrice} onChange={(e)=>handleInputChange(e, setAddPrice)}></input>
                        <label>Quantity</label>
                        <input value={addQuantity} onChange={(e)=>handleInputChange(e, setAddQuantity)}></input>
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