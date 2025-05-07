import { useState } from "react";
import toast from "react-hot-toast";
import { searchProduct as searchProductRequest  } from "../../services/api";

export const useProductDetails = () =>{
    const [productDetails, setProductsDetails] = useState({});

    const getProductsDetails = async (id) => {
        const responseData = await searchProductRequest(id);

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the product'
            )
        }

        setProductsDetails(responseData)
    }

    return {
        productDetails,
        isFetching: !productDetails,
        getProductsDetails
    }
}