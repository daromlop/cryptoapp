import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCoins, searchCoins, setQuery } from "../reducers/coinSlice";
import debounce from "../helpers/debounce";
import Header from "../components/Header";
import ListItem from "../components/ListItem";

const Home = () => {
  const dispatch = useDispatch();

  const error = useSelector((store) => store.coinsStore.error);

  const coins = useSelector((store) => store.coinsStore.coins);

  const query = useSelector((store) => store.coinsStore.query);

  const searching = useSelector((store) => store.coinsStore.searching);

  useEffect(() => {
    if (query.length > 2) {
      dispatch(searchCoins(query));
    } else {
      dispatch(getCoins());
      console.log(coins);
    }
  }, [query]);

  return (
    <div>
      <Header />
      <div className="home__search width">
        <h2>Buscar Criptomoneda</h2>
        <div className="search__input">
          <input
            type="text"
            defaultValue={query}
            onChange={debounce((e) => dispatch(setQuery(e.target.value)), 1000)}
          />
          <svg
            className={searching ? "show" : "hide"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
          >
            <path
              fill="currentColor"
              d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"
            />
          </svg>
        </div>
        <p>(Consultas limitadas a 30 por minuto, si no funciona, esperar 2 minutos y recargar la web)</p>
      </div>
      <div className="home__cryptos">
        <div className="width">
          {error ? (
            <h2>Límite de consultas excedido, espera 2 minutos y recarga la web</h2>
          ) : (
            <>
              <h2>{query.length > 2 ? "Criptomonedas Encontradas" : "Criptomonedas en tendencia"}</h2>
              <div className="cryptos__list">
                {coins.map((coin) => {
                  return <ListItem key={coin.id} coin={coin} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
