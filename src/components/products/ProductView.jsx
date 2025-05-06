import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { useProductDetails } from '../../shared/hooks/useProductsDetails';

export const ProductView = ({getProducts}) => {
    const { isFetching, getProductsDetails, productsDetails } = useProductDetails();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductsDetails(id)
    }, [id])

    if (isFetching || !productsDetails) {
        return <LoadingSpinner />;
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
            <button className="btn btn-warning mb-3" onClick={() => navigate(`/products/edit/${id}`)}>
                Update Product
            </button>
        </div>
    )
}