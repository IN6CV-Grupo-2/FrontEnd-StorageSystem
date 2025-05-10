import { useState } from "react";
import toast from "react-hot-toast";
import { searchProduct as searchProductRequest  } from "../../services/api";

export const useProductDetails = () =>{
    const [productDetails, setProductsDetails] = useState({});
    const [isFetching, setIsFetching] = useState(false)

    const getProductsDetails = async (id) => {
        const responseData = await searchProductRequest(id);

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data || 'Error to search the product'
            )
        }else {
            setProductsDetails(responseData.data.product)
        }

        setIsFetching(false);
    }

    return {
        productDetails,
        isFetching,
        getProductsDetails
    }
}