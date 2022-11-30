import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {

    const [,, products, setProducts] = useOutletContext();

    const [detailedSpecificProduct, setDetailedSpecificProduct] = useState({})

    const [toggleProductDetailsForm, setToggleProductDetailsForm] = useState(false)

    const { id } = useParams();

    function handleToggleProductDetailsForm () {
        setToggleProductDetailsForm (!toggleProductDetailsForm);
    }

    
    useEffect(() => {
        async function findSpecificProduct () {
            try {
                const [specificProduct] = await products.product.filter((element) => element._id == id);
                setDetailedSpecificProduct(specificProduct);
            } catch(error) {
                console.log(error);
            }
        }
        findSpecificProduct()
    }, []) 

    return (
        <div>
            <button onClick ={handleToggleProductDetailsForm}>Product Details</button>
            {
                toggleProductDetailsForm ? <ProductDetails indivProduct={detailedSpecificProduct} setProducts = {setProducts}
                handleToggleProductDetailsForm= {handleToggleProductDetailsForm}/>: null
            }

            <div>
                <h3>Product Details:</h3>
                {
                    detailedSpecificProduct.title ? <p>{detailedSpecificProduct.title}</p> : <p>Untitled Product</p>
                }
            </div>
        </div>
    )
}

export default ProductDetails
