import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinData, setGraphData, setCoinData } from "../reducers/coinSlice";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Header from "../components/Header";

const Show = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const graphData = useSelector((store) => store.coinsStore.graphData);

  const coinData = useSelector((store) => store.coinsStore.coinData);

  const error = useSelector((store) => store.coinsStore.error);

  useEffect(() => {
    dispatch(fetchCoinData(params.id));

    return () => {
      dispatch(setGraphData([])); /* Se resetea para que los datos anteriores de consulta de otra coin no salgan */
      dispatch(setCoinData(null));
    };
  }, []);

  return (
    <div>
      <Header back />
      {coinData ? (
        <>
          <div className="show__header">
            <img src={coinData.image.large} />
            <h2>
              {coinData.name} ({coinData.symbol})
            </h2>
          </div>
          <div className="width">
            <div className="show__graph">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={graphData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="show__details">
            <div className="width">
              <h2>Detalles</h2>

              <div className="details__row">
                <h3>Rango de cap. de mercado</h3>
                <span>{coinData.market_cap_rank}</span>
              </div>
              <div className="details__row">
                <h3>Máximo en 24h</h3>
                <span>{coinData.market_data.high_24h.eur}</span>
              </div>
              <div className="details__row">
                <h3>Mínimo en 24h</h3>
                <span>{coinData.market_data.low_24h.eur}</span>
              </div>
              <div className="details__row">
                <h3>Cantidad circulante</h3>
                <span>{coinData.market_data.circulating_supply}</span>
              </div>
              <div className="details__row">
                <h3>Precio Actual (EUR)</h3>
                <span>{coinData.market_data.current_price.eur}</span>
              </div>
              <div className="details__row">
                <h3>Cambio en 1 año</h3>
                <span>{coinData.market_data.price_change_percentage_1y.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </>
      ) : error ? (
        <div className="show__header">
          <h2>Límite de consultas excedido, espera 2 minutos y recarga la web</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Show;

// 52:00
