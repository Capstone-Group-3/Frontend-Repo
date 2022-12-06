import {useState} from "react"
import {useOutletContext} from "react-router-dom"

const EditProduct=({indivProduct})=>{
    const {usernameState, adminState, currentToken, productsState:[products, setProducts]} = useOutletContext()
    const {id, name, description, quantiy, price} = indivProduct
    const [targetedProduct, setTargetedProduct]= useState(0)
    const [targetName, setTargetName]=useState("")
    const [targetDescription, setTargetDescription]=useState("")
    const [targetPrice, setTargetPrice]=useState(0)
    const [targetQuantity, setTargetQuantity]=useState(0)

    async function deactivateProduct(event, prodId){
        event.preventDefault()
        await setTargetedProduct(prodId)
        await deleteProduct(event, prodId)
    }

    async function editTargetProduct(event, prodId){
        setTargetedProduct(prodId)
        await editProduct(event, prodId)
    }

    function handleInputChange(event, setter){
        console.log(event.target.value)
        setter(event.target.value)
    }

    async function deleteProduct(event, id) {
        event.preventDefault()
        console.log(targetedProduct)
        try {
            const response = await fetch(`http://localhost:3030/api/products/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${currentToken}`
                }
            })
            const deletedProductData=await response.json()
            const productResponse = await fetch ('http://localhost:3030/api/products')
            const newProducts = await productResponse.json()
            setProducts(newProducts);
        } catch (error) {
            console.error(error)
        }
    }

    async function editProduct(event, targetedProduct) {
        event.preventDefault()
        const productInfo={}
        if (targetName.length) {
            productInfo.name = targetName
        };
    
        if (targetDescription.length) {
            productInfo.description = targetDescription
        };
    
        if (targetPrice>0) {
            productInfo.price = targetPrice
        };
    
        if (targetQuantity>=0) {
            productInfo.quantity = targetQuantity
        };
        try {
            const response=await fetch(`http://localhost:3030/api/products/${targetedProduct}`,{
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${currentToken}`
                },
                body:JSON.stringify(productInfo)
            })
            const data= await response.json();
            console.log(data)
            const productResponse = await fetch ('http://localhost:3030/api/products')
            const newProducts = await productResponse.json()
            setProducts(newProducts);
        } catch (error) {
            console.error(error)
        }
    }


    return <div>
        <p>{name}</p>
        <form onSubmit={(e)=>editTargetProduct(e, id)}>
            <label>Name</label>
            <input value={targetName} onChange={(e)=>handleInputChange(e, setTargetName)}></input>
            <label>Description</label>
            <input value={targetDescription} onChange={(e)=>handleInputChange(e, setTargetDescription)}></input>
            <label>Price</label>
            <input value={targetPrice} onChange={(e)=>handleInputChange(e, setTargetPrice)}></input>
            <label>Quantity</label>
            <input value={targetQuantity} onChange={(e)=>handleInputChange(e, setTargetQuantity)}></input>
            <button type="submit" value={id}>Edit</button>
        </form>
            <button type="button" onClick={(e)=>deactivateProduct(e, id)} value={id}>Delete</button>

    </div>
    }
 export default EditProduct