import { useNavigate } from "react-router-dom";
import { ProductCard } from './ProductCard';
import { useEffect } from "react";

export const Products = ({products}) => {
    const navigate = useNavigate();

    const handleNavigateProducts = (id) => {
        navigate(`/products/${id}`)
    }


    return (
        <div className="product-container">
            <button className="btn btn-success mb-3" onClick={() => navigate('/products/new')}>
                Create Product
            </button>
        {products.map((c) => (
            <ProductCard
                key={c.uid}
                id={c.uid}
                name={c.name}
                price={c.price}
                provider={c.provider}
                navigateToProductHandler={handleNavigateProducts}
            />
        ))}
    </div>
    )
}