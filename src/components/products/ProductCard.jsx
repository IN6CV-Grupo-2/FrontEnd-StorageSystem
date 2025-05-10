

const imageUrl = 'https://www.shutterstock.com/image-vector/product-defect-label-line-icon-600nw-2252869127.jpg'

const ProductImage = ({ image }) => {
  return (
    <div className="w-full aspect-square bg-gray-100">
      <img
        src={image || imageUrl}
        alt="Imagen del producto"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const  ProductCard = ({
    id,
    name,
    price,
    provider,
    image,
    navigateToProductHandler
}) => {
    const handleNavigate = () => {
        navigateToProductHandler(id)
    }

    return(
        <div
      className="card"
      onClick={handleNavigate}
      style={{ cursor: 'pointer' }}
    >
      <ProductImage url={image} />
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">
          <span className="font-semibold">Precio:</span> ${price}
        </p>
        <p className="card-description">
          <span className="font-semibold">Proveedor:</span> {provider?.name || provider}
        </p>
        <button className="card-button">
          More Details
        </button>
      </div>
    </div>
    )
}