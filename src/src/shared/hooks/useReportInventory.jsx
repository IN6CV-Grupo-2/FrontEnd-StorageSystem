import { useState } from "react";
import toast from "react-hot-toast";
import { getReportInventory as getReportInventoryRequest } from "../../services/api";

export const useReportInventory = () => {
    const [reportInventory, setReportInventory] = useState(null);

    const getReportInventory = async () => {
        const reportInventoryData = await getReportInventoryRequest();

        if(reportInventoryData.error){
            return toast.error(
                reportInventoryData.e?.response?.data || 'Error to get report Inventory'
            )
        }
    }

    return {
        getReportInventory,
        isFetching: !Boolean(reportInventory)
    }
}