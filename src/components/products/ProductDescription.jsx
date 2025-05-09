
export const ProductDescription = ({
    productId,
    name,
    category,
    quantity,
    price,
    provider,
    entryDate,
    expirationDate,
    urlImage
}) => {

    const formaDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="container my-4 p-4 border rounded shadow-sm bg-light">
            <h5 className="text-primary mb-3">ID: {productId}</h5>
            <h4 className="text-dark mb-4">Producto: {name}</h4>
            <div className="row g-3">
                <div className="col-md-6">
                <div className="form-group">
                    <label className="fw-bold">Categoría:</label>
                    <p className="form-control-plaintext">{category?.name || 'N/A'}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <label className="fw-bold">Cantidad:</label>
                    <p className="form-control-plaintext">{quantity}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <label className="fw-bold">Precio:</label>
                    <p className="form-control-plaintext">{price}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <label className="fw-bold">Proveedor:</label>
                    <p className="form-control-plaintext">{provider?.name || 'N/A'}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <label className="fw-bold">Fecha de ingreso:</label>
                    <p className="form-control-plaintext">{formaDate(entryDate)}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <label className="fw-bold">Fecha de vencimiento:</label>
                    <p className="form-control-plaintext">{formaDate(expirationDate)}</p>
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <img src={urlImage} alt="Image's Product" /> Image's Product
                </div>
                </div>
            </div>
        </div>
    )
}