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
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded m-4"
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

            
            <div className="card-container">
                {filteredProducts.map((c) => (
                    <ProductCard
                    key={c.uid}
                    id={c.uid}
                    name={c.name}
                    price={c.price}
                    provider={c.provider}
                    image={c.image}
                    navigateToProductHandler={handleNavigateProducts}
                    />
                ))}
            </div>
        </div>
    )
}