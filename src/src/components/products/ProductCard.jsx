const imageUrl = ''

const ProductAvatar = ({url}) => {
    return (
        <div className="product-image-container">
            <img src={url || imageUrl} width='100%' height='100%' alt="Default Avatar" />
        </div>
    )
}

export const  ProductCard = ({
    id,
    name,
    price,
    provider,
    navigateToProductHandler
}) => {
    const handleNavigate = () => {
        navigateToProductHandler(id)
    }

    return(
        <div className="products-card" onClick={handleNavigate}>
            <span className="products-card-name">{name}</span>
            <span className="products-card-name">{price}</span>
            <span className="products-card-name">{provider}</span>
        </div>
    )
}