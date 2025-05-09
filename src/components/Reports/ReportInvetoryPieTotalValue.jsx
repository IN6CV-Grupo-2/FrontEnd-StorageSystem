import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { getReportInventory } from '../../services/api';
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';

export const PieInventoryActive = () => {
    const [productList, setProductList] = useState([]);
    const [valorTotal, setValorTotal] = useState(null);

    const valueFormatter = (item) => `Q.${item.value}`

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReportInventory();
                const productos = response?.data?.productos;
                const valor_Total =response?.data?.resumen?.valorTotalInventario;
                

                if (Array.isArray(productos)) {
                    setProductList(productos);
                } else {
                    console.warn("productList no es un arreglo válido", response);
                }

                if(valor_Total){
                    setValorTotal(valor_Total);
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
        <div>
            <h1>Valor total del Inventario</h1>
            <PieChart
            colors={cheerfulFiestaPalette}
            series={[
                {
                    
                    data: pieData,
                    innerRadius: 30,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, },
                    valueFormatter,
                }
            ]}
            height={200}
            width={200}
        />
        <label>Valor Total de todo el Inventario: {valorTotal}</label>
        </div>
    );
};