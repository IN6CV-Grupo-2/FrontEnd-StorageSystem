import { useNavigate } from "react-router-dom";
import { ProductCard } from './ProductCard';

export const Products = ({products}) => {
    const navigate = useNavigate();

    const handleNavigateProducts = (id) => {
        navigate(`/products/${id}`)
    }

    return (
        <div className="product-container">
            <button className="btn btn-success mb-3" onClick={() => navigate('/new')}>
                Create Product
            </button>
        {products.map((c) => (
            <ProductCard
                key={c.id}
                id={c.id}
                name={c.name}
                price={c.price}
                provider={c.provider}
                navigateToProductHandler={handleNavigateProducts}
            />
        ))}
    </div>
    )
}