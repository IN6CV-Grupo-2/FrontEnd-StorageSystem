import { useEffect,useState } from "react";
import { PieChart } from "@mui/x-charts";
import { getReportInventory } from "../../services/api";
import { mangoFusionPalette } from "@mui/x-charts";

export const BarChartProducts = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReportInventory();
                const products = response?.data?.productos;

                if(Array.isArray(products)){
                    setProductList(products);
                    
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    },[])

    const pieData = productList.map((product, index) => ({
        id: index,
        value: product.precioUnitario,
        label: product.nombre
    }));

    return(
        <div>
            <h1>Unit Price</h1>
            <p>The graph shows the unit price of each product</p>
            <PieChart
                colors={mangoFusionPalette}
                series={[
                    {
                        data: pieData,
                        innerRadius: 30,
                        highlightScope: { fade: 'global',highlight:'item'},
                        faded: {innerRadius: 30, additionalRadius: -30}
                    }
                ]}
                height={300}
                width={300}
            />
        </div>
    )
}