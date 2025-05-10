

const MovementList = ({ movements, onSelect, onAdd }) => {
    return (
        <div className="movement-list-container">
            <div className="list-header">
                <h2>Registered Movements</h2>
                <button className="add-button" onClick={onAdd}>Nuevo Movimiento</button>
            </div>
            <table className="movement-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {movements?.map((movement) => (
                        <tr key={movement._id} onClick={() => onSelect(movement)} className={`movement-item ${movement.type}`}>
                            <td>{movement.product?.name}</td>
                            <td>{movement.type}</td>
                            <td>{movement.quantity}</td>
                            <td>{new Date(movement.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovementList;