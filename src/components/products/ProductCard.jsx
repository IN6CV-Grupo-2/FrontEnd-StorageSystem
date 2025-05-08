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
        <div className="card product-card shadow-sm border-0 mb-3" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
            <div className="card-body">
                <h5 className="card-title text-primary">{name}</h5>
                <p className="card-text mb-1"><strong>Precio Unitario:</strong> {price}</p>
                <p className="card-text"><strong>Proveedor:</strong> {provider}</p>
            </div>
        </div>
    )
}