import { useState } from "react";
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
                width: 70,
            },
        ],
        height: 300,
    };

    return (
        <div className="pie-container" >
            <h1>Movement Report</h1>
            <p>The graph shows the movement of products within a specific period of time.</p>
            <div>
                <h5>Select a Date to Start Date</h5>
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
                <h5>Select a date to End Date</h5>
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
