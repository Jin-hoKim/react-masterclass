import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

import ApexChart from "react-apexcharts";
import Price from "./Price";

interface IChartProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volumne: number;
    market_cap: number;
}

export default function Chart({ coinId }: IChartProps) {
    const { isLoading, data: datas } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );

    return (
        <div>
            {isLoading ? (
                "Loading"
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: datas?.map(
                                (price) => price.close
                            ) as number[],
                        },
                    ]}
                    options={{
                        theme: { mode: "dark" },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["blue"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["red"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            categories: datas?.map((item) => item.time_close),
                            type: "datetime",
                        },
                        yaxis: {
                            show: false,
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: { show: false },
                            background: "transparent",
                        },
                        grid: {
                            show: false,
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                    }}
                />
            )}
        </div>
    );
}
