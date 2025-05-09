import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { useProductDetails } from '../../shared/hooks/useProductsDetails';
import { ProductDescription } from './ProductDescription'

export const ProductView = ({getProducts}) => {
    const { isFetching, getProductsDetails, productDetails } = useProductDetails();
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getProductsDetails(id)
    }, [id])


    if (isFetching || !productDetails) {
        return <LoadingSpinner />;
    }
    return(
        <div className="product-container">
            {console.log(productDetails)}
            <ProductDescription
                productId={productDetails.uid}
                name={productDetails.name}
                category={productDetails.category}
                quantity={productDetails.quantity}
                price={productDetails.price}
                provider={productDetails.provider}
                entryDate={productDetails.entryDate}
                expirationDate={productDetails.expirationDate}
            />
            <button className="btn-update" onClick={() => navigate(`/products/edit/${id}`)}>
                Update Product
            </button>
            <button className="btn-update mb-3" onClick={() => navigate('/products')}>
                Come Back
            </button>
        </div>
    )
}