import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { getReportStatistics } from "../../services/api";

export const BarChartStatistics = () => {
    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getReportStatistics();
                console.log(response);
            } catch (error) {
                console.error('Error to get products', error)
            }
        }
    })
}