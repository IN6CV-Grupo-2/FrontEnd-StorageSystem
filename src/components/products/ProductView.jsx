import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../settings/LoadingSpinner";
import { useProductDetails } from '../../shared/hooks/useProductDetails';

export const ProductView = ({getProducts}) => {
    const { isFetching, getProductsDetails, productsDetails } = useProductDetails();
    const { id } = useParams();

    useEffect(() => {
        getProductsDetails(id)
    }, [])

    if(isFetching){
        return <LoadingSpinner/>
    }

    return(
        <div className="product-container">
            <ProductDescription
                productId={productsDetails.id}
                name={productsDetails.name}
                category={productsDetails.category}
                quantity={productsDetails.quantity}
                price={productsDetails.price}
                provider={productsDetails.provider}
                entryDate={productsDetails.entryDate}
                expirationDate={productsDetails.expirationDate}
            />
        </div>
    )
}