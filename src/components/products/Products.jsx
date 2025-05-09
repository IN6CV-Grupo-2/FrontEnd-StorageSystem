import { useNavigate } from "react-router-dom";
import { ProductCard } from './ProductCard';
import { useState } from "react";

export const Products = ({products}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleNavigateProducts = (id) => {
        navigate(`/products/${id}`)
    }

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        setSearchQuery(searchTerm);
    }

    const filteredProducts = searchQuery?.trim()
    ? products?.filter((prov) =>
        prov.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prov.category?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prov.price.toString().includes(searchQuery) ||
        prov.provider?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prov.entryDate.includes(searchQuery) ||
        prov.expirationDate.includes(searchQuery)
    )
  : products;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    onClick={() => navigate('/products/new')}
                >
                    Create Product
                </button>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search Product"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        className="border border-gray-300 px-3 py-2 rounded w-64"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((c) => (
                    <div
                        key={c.uid}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
                    >
                        <div className="w-full aspect-square bg-gray-100">
                            <img
                                src={c.imageUrl || "/default-product.png"}
                                alt={c.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-bold text-blue-700 mb-1">{c.name}</h2>
                            <p className="text-gray-700"><span className="font-semibold">Precio:</span> ${c.price}</p>
                            <p className="text-gray-700"><span className="font-semibold">Proveedor:</span> {c.provider?.name || c.provider}</p>
                            <button
                                className="mt-3 text-sm text-blue-600 hover:underline self-start"
                                onClick={() => handleNavigateProducts(c.uid)}
                            >
                                More Details
                            </button>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    )
}