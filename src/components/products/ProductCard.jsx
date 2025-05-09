import './ProductCard.css'

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
        <div className="card-product" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
            <div className="card-info">
                <h5 className="title text-primary">{name}</h5>
                <p className="title mb-1"><strong>Precio Unitario:</strong> {price}</p>
                <p className="title"><strong>Proveedor:</strong> {provider}</p>
            </div>
        </div>
    )
}