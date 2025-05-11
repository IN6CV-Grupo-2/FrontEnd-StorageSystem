import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { getReportMovements } from "../../services/api";
import DatePicker from "react-datepicker";

export const BarChartMovements = () => {
    const [movementsList, setMovementsList] = useState([]);
    const [dates, setDates] = useState({
        startDate: null,
        endDate: null,
    });

    const fetchData = async () => {
        if (!dates.startDate || !dates.endDate) {
            alert("Por favor selecciona ambas fechas.");
            return;
        }


        const formattedDates = {
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
        };

        try {
            const response = await getReportMovements(formattedDates);
            const movements = response?.data?.movimientos;

            if (Array.isArray(movements)) {
                setMovementsList(movements);
            }

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const barData = movementsList.map((movement) => ({
        producto: `${movement.producto} - ${movement.tipo} (${movement.fecha?.slice(0, 10)})`,
        cantidad: movement.cantidad,
        precioUnitario: movement.precioUnitario,
    }));

    const chartSetting = {
        yAxis: [
            {
                label: "Valores",
                width: 60,
            },
        ],
        height: 300,
    };

    return (
        <div>
            <div>
                <h3>Select a Date to Start Date</h3>
                <DatePicker
                    selected={dates.startDate}
                    onChange={(date) =>
                        setDates((prev) => ({
                            ...prev,
                            startDate: date,
                        }))
                    }
                    dateFormat={"yyyy-MM-dd"}
                    className="form-control"
                    placeholderText="Select a Start Date"
                />
            </div>
            <div>
                <h3>Select a date to End Date</h3>
                <DatePicker
                    selected={dates.endDate}
                    onChange={(date) =>
                        setDates((prev) => ({
                            ...prev,
                            endDate: date,
                        }))
                    }
                    dateFormat={"yyyy-MM-dd"}
                    className="form-control"
                    placeholderText="Select an End Date"
                />
            </div>
            <button type="submit" onClick={fetchData}>
                Show Report
            </button>
            <div>
                <BarChart
                    dataset={barData}
                    xAxis={[{ dataKey: "producto" }]}
                    series={[
                        { dataKey: "cantidad", label: "Cantidad" },
                        { dataKey: "precioUnitario", label: "Precio Unitario" },
                    ]}
                    {...chartSetting}
                />
            </div>
        </div>
    );
};
