import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  coins: [],
  query: "",
  graphData: [],
  coinData: "",
  searching: false,
  error: false,
};

export const getCoins = () => {
  return async (dispatch) => {
    const [trendingRes, btcRes] = await Promise.all([
      await fetch(`https://api.coingecko.com/api/v3/search/trending`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
          dispatch(setError(true));
        }),
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
          dispatch(setError(true));
        }),
    ]);

    const responses = {
      trendingRes,
      btcRes,
    };

    dispatch(fetchCoins(responses));
  };
};

export const searchCoins = (query) => {
  return async (dispatch) => {
    dispatch(setSearching(true));

    await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(setCoins(response));
        dispatch(setSearching(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setError(true));
      });
  };
};

export const fetchCoinData = (id) => {
  return async (dispatch) => {
    const [graphRes, dataRes] = await Promise.all([
      await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=120`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
          dispatch(setError(true));
        }),
      await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
          dispatch(setError(true));
        }),
    ]);

    const graphData = graphRes.prices.map((price) => {
      const [timeStamp, p] = price;

      const date = new Date(timeStamp).toLocaleDateString("es-es");

      return {
        date: date,
        price: p,
      };
    });

    dispatch(setGraphData(graphData));
    dispatch(setCoinData(dataRes));
  };
};

export const coinSlice = createSlice({
  name: "coin",
  initialState: initialState,
  reducers: {
    fetchCoins: (state, action) => {
      state.data = action.payload;

      const coins = state.data.trendingRes.coins.map((coin) => {
        return {
          name: coin.item.name,
          image: coin.item.large,
          id: coin.item.id,
          priceBtc: coin.item.price_btc.toFixed(10),
          priceEur: (coin.item.price_btc * state.data.btcRes.bitcoin.eur).toFixed(10),
        };
      });

      state.coins = coins;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCoins: (state, action) => {
      state.data = action.payload;

      const searchedCoins = state.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
          priceBtc: coin.price_btc,
        };
      });

      state.coins = searchedCoins;
    },
    setGraphData: (state, action) => {
      state.graphData = action.payload;
    },
    setCoinData: (state, action) => {
      state.coinData = action.payload;
    },
    setSearching: (state, action) => {
      state.searching = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { fetchCoins, setQuery, setCoins, setGraphData, setCoinData, setSearching, setError } = coinSlice.actions;

export default coinSlice.reducer;
