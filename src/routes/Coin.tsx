import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
    font-size: 20px;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;

interface RouteState {
    state: {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        is_new: boolean;
        is_active: boolean;
        type: string;
    };
}

interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface ICoinPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

export default function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<string>();
    const { state } = useLocation() as RouteState;

    const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
    const [coinPrice, setCoinPrice] = useState<ICoinPrice>();

    useEffect(() => {
        (async () => {
            const coinInfo = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();

            const coinPrice = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setCoinInfo(coinInfo);
            setCoinPrice(coinPrice);
            setLoading(false);
        })();
    }, [coinId]);

    return (
        <Container>
            <Header>
                <Title>{state?.id ? coinInfo?.name : "Loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>Now Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{coinInfo?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${coinInfo?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{coinInfo?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{coinInfo?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{coinPrice?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{coinPrice?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Routes>
                        <Route path="price" element={<Price />} />
                        <Route path="chart" element={<Chart />} />
                    </Routes>
                </>
            )}
        </Container>
    );
}
