import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ coin }) => {
  return (
    <div className="home__crypto">
      <Link to={`/${coin.id}`}>
        <span className="crypto__image">
          <img src={coin.image} />
        </span>
        <span className="crypto__name">{coin.name}</span>

        {coin.priceBtc && (
          <span className="crypto__prices">
            <span className="prices__btc">
              <img src="/bitcoin.webp" />
              {coin.priceBtc} BTC
            </span>
            <span className="prices__eur">{coin.priceEur} EUR</span>
          </span>
        )}
      </Link>
    </div>
  );
};

export default ListItem;
