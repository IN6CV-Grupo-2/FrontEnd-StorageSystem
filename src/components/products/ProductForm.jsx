import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { useProductDetails } from "../../shared/hooks/useProductsDetails";
import { createProduct, updateProduct } from "../../services/api";
import { useProviders } from "../../shared/hooks/useProviders";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ProductForm = ({  modo = 'crear' }) => {
    const { id } = useParams();
    const { isFetching, getProductsDetails, productDetails } = useProductDetails();
    const { providers, isLoading: loadingProviders, getProviders } = useProviders();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        provider: '',
        entryDate: null,
        expirationDate: ''
    });


    useEffect(() => {
        if (modo === 'editar' && id) {
            getProductsDetails(id);
        }
    }, [modo, id]);

    useEffect(() => {
        if (productDetails && modo === 'editar') {
            setFormData(productDetails);
        }
    }, [productDetails]);

    useEffect(() => {
        getProviders();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modo === 'crear') {
            const res = await createProduct(formData);
            if (!res.error) {
                navigate('/products');
            }
        } else if (modo === 'editar') {
            const res = await updateProduct(id, formData);
            if (!res.error) {
                navigate('/products');
            }
        }
    };

    if (isFetching && modo === 'editar') {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mt-4">
            <h2>{modo === 'crear' ? 'Crear Producto' : 'Editar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                {[  
                    { label: "Name", name: "name" },
                    { label: "Category", name: "category" },
                    { label: "Quantity", name: "quantity" },
                    { label: "Price", name: "price" },
                ].map(({ label, name }) => (
                    <div className="mb-3" key={name}>
                        <label className="form-label">{label}</label>
                        <input
                            className="form-control"
                            name={name}
                            value={formData[name] || ''}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <div className="mb-3">
                    <label className="form-control">Expiration Date</label>
                    <DatePicker
                        selected={
                            formData.expirationDate
                                ? new Date(formData.expirationDate)
                                : null
                        }
                        onChange={(date) => 
                            setFormData((prev) =>({
                                ...prev,
                                expirationDate: date,
                            }))
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        placeholderText="Seleccione una Fecha"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Proveedor</label>
                    <select
                        className="form-control"
                        name="provider"
                        value={formData.provider || ''}
                        onChange={handleChange}
                        disabled={loadingProviders}
                    >
                        <option value="">Seleccione un Proveedor</option>
    
                        {providers && providers.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                                {prov.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">
                    {modo === 'crear' ? 'Crear Producto' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
};