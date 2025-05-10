import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { getReportStatistics } from "../../services/api";

export const BarChartStatistics = () => {
    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReportStatistics();
                const products = response?.data?.productosMasMovidos;

                if(Array.isArray(products)){
                    setProductList(products);
                }
                console.log(response)
            } catch (error) {
                console.error('Error to get products', error)
            }
        };

        fetchData();
    },[])

    const barData = productList.map((product) => ({
        producto: product.producto,
        entradas: product.entradas,
        salidas: product.salidas,
        stock: product.stock,
        movimientos: product.movimientos
    }));

    const chartSetting = {
        yAxis: [
            {
            label: 'rainfall (mm)',
            width: 60,
            },
        ],
        height: 300,
    };

    return(
        <div>
            <BarChart
                dataset={barData}
                xAxis={[{dataKey: 'producto' }]}
                series={[
                    {dataKey: 'entradas',label: 'Entradas'},
                    {dataKey: 'salidas',label: 'Salidas'},
                    {dataKey: 'stock', label: 'Stock'},
                    {dataKey: 'movimientos', label: 'Movimientos'}
                ]}
                {...chartSetting}
            />
        </div>
    )
}