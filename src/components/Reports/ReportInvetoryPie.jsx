import { PieChart } from '@mui/x-charts/PieChart';
import { getReportInventory } from '../../services/api';

export const PieInventoryActive = () => {

    const { productList } = getReportInventory();
    const pieData = productList.map((product, index) => ({
        id: index,
        value: product.valorTotal,
        label: product.nombre,
    }));
    

    return(
        <PieChart
            series={[
                {
                    data: pieData,
                    highlightScope: { fade: 'global', highlight: 'item'},
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'grey'},
                }
            ]}
            height={200}
            width={200}
        />
    )
}