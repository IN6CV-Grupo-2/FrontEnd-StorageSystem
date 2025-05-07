import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { getReportInventory } from '../../services/api';

export const PieInventoryActive = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReportInventory();
                const productos = response?.data?.productos;

                if (Array.isArray(productos)) {
                    setProductList(productos);
                } else {
                    console.warn("productList no es un arreglo válido", response);
                }
            } catch (error) {
                console.error("Error al obtener el inventario:", error);
            }
        };

        fetchData();
    }, []);

    const pieData = productList.map((product, index) => ({
        id: index,
        value: product.valorTotal,
        label: product.nombre,
    }));

    
    return (
        <PieChart
            series={[
                {
                    
                    data: pieData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'grey' },
                }
            ]}
            height={200}
            width={200}
        />
    );
};