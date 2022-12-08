import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";
import EditProduct from './EditProduct'
import "./css/PrestonAdmin.css"

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
            const response=await fetch(`https://project-09-backend.onrender.com/api/products`, {
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
            const userGroup = await fetch("https://project-09-backend.onrender.com/api/users/nonAdmin", {
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
                <h2 className="titleHeader">Give Administrative Privleges</h2>
                <button className='openButton' onClick={(()=>setIsUsersToggled(!isUsersToggled))}>Show Users</button>
                <div className="userContainer">{isUsersToggled && regUsers.map((indivUser, idx)=>{
                    return <form className="adminIndivUser" onSubmit={promoteUser} key={idx}>
                        <p classname='IndivUserChild'>{indivUser.username}</p>
                        
                        <button classname='IndivUserChild userButton'type="submit" value={indivUser.name}>Promote</button>
                    </form>
                })}</div>

                <h2 className="titleHeader">Edit Products</h2>
                <button className='openButton' onClick={(()=>setIsProductsToggled(!isProductsToggled))}>Show Products</button>
                <div className="editProductContainer">{isProductsToggled && products.map((indivProduct, idx)=>{
                    return <EditProduct key={idx} indivProduct={indivProduct}/>
                })}</div>
                <div>
                    <h2 className="titleHeader">Add a new Product</h2>
                    <div className='makeProduct'>
                        <form className='adminIndivEdit'onSubmit={makeProduct}>
                            <label>Name</label>
                            <br/>
                            <input value={addName} onChange={(e)=>handleInputChange(e, setAddName)}></input>
                            <br/>
                            <label>Description</label>
                            <br/>
                            <input value={addDescription} onChange={(e)=>handleInputChange(e, setAddDescription)}></input>
                            <br/>
                            <label>Price</label>
                            <br/>
                            <input value={addPrice} onChange={(e)=>handleInputChange(e, setAddPrice)}></input>
                            <br/>
                            <label>Quantity</label>
                            <br/>
                            <input value={addQuantity} onChange={(e)=>handleInputChange(e, setAddQuantity)}></input>
                            <br/>
                            <button type="submit">Submit</button>
                    </form>
                    </div>
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