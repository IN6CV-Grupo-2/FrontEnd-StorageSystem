
export const ProductDescription = ({
    name,
    description,
}) => {

    return (
        <div className="product-description-container">
            <span className="product-description-title">{name}</span>
            <div className="product-description-box">
                <span className="product-description">{description}</span>
            </div>
        </div>
    )
}