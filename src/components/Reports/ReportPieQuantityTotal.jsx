import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import { getReportInventory } from "../../services/api";
import {  blueberryTwilightPalette } from '@mui/x-charts/colorPalettes';

export const PieQuantityTotal = () => {
    const [productList, setProductList] = useState([]);
    const [totalStock, setTotalStock] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReportInventory();
                const products = response?.data?.productos;
                const total_Stock = response?.data?.resumen?.totalStock;
        
                if(Array.isArray(products)){
                    setProductList(products);
                }

                if(total_Stock){
                    setTotalStock(total_Stock);
                }
            } catch (error) {
                console.error("Error to get the information",error)
            }
        };

        fetchData();
    }, []);

    const pieData = productList.map((product, index) => ({
        id: index,
        value: product.cantidad,
        label:  product.nombre
    }));

    return(
        <div>
            <h1>Stock Quantity</h1>
            <p>The graph shows the amount of stock there is of each product and the total amount of all products.</p>
            <PieChart
            colors={blueberryTwilightPalette}
            series={[
                {
                    data: pieData,
                    innerRadius: 30,
                    highlightScope: { fade: 'global',highlight: 'item'},
                    faded: {innerRadius: 30, additionalRadius: -30}
                }
            ]}
            height={300}
            width={300}
        />
        <label>Total Stock : {totalStock}</label>
        </div>
    )
}