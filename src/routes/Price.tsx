import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

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

const Container = styled.ul``;
const PriceItem = styled.li`
    background-color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.bgColor};
    margin: 5px 10px;
    padding: 10px 10px;
    font-size: 12px;
    border-radius: 15px;
`;

const PriceData = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

const ItemTitle = styled.span`
    font-weight: bolder;
    margin-right: 5px;
`;

const ItemValue = styled.span`
    font-weight: 400;
`;

export default function Price({ coinId }: IChartProps) {
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
                <Container>
                    {datas?.map((price) => (
                        <PriceItem>
                            <PriceData>
                                <ItemTitle>Time</ItemTitle>
                                <ItemValue>{price.time_close}</ItemValue>
                            </PriceData>
                            <PriceData>
                                <ItemTitle>Close</ItemTitle>
                                <ItemValue>${price.close}</ItemValue>
                            </PriceData>
                        </PriceItem>
                    ))}
                </Container>
            )}
        </div>
    );
}
