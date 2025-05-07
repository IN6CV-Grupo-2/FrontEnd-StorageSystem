
export const ProductDescription = ({
    productId,
    name,
    category,
    quantity,
    price,
    provider,
    entryDate,
    expirationDate
}) => {

    const formaDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="product-description-container">
            <span className="product-description-title">{productId}</span>
            <span className="product-description-title">{name}</span>
            <div className="product-description-box">
                <span className="product-description">{category?.name || 'N/A'}</span> 
                <span className="product-description">{quantity}</span>
                <span className="product-description">{price}</span>
                <span className="product-description">{provider?.name || 'N/A'}</span> 
                <span className="product-description">{formaDate(entryDate)}</span>
                <span className="product-description">{formaDate(expirationDate)}</span>
            </div>
        </div>
    )
}