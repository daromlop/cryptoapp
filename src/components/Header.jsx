import React from "react";
import { Link } from "react-router-dom";

const Header = ({ back }) => {
  return (
    <header className="header">
      <div className="width">
        {back && (
          <Link to="/">
            <svg className="header__back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24">
              <path fill="currentColor" d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z" />
            </svg>
          </Link>
        )}

        <div className="header__logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26">
            <path
              fill="currentColor"
              d="M18.5 42v-4.5H12v-3h4.5v-21H12v-3h6.5V6h3v4.5H27V6h3v4.65q2.7.55 4.35 2.65Q36 15.4 36 18q0 1.4-.55 2.775t-1.6 2.475q1.95 1 3.05 2.825Q38 27.9 38 30q0 3.1-2.175 5.3-2.175 2.2-5.325 2.2H30V42h-3v-4.5h-5.5V42Zm1-19.5h9q1.9 0 3.2-1.325Q33 19.85 33 18q0-1.9-1.3-3.2-1.3-1.3-3.2-1.3h-9Zm0 12h11q1.9 0 3.2-1.325Q35 31.85 35 30q0-1.9-1.3-3.2-1.3-1.3-3.2-1.3h-11Z"
            />
          </svg>
          <h1>
            <Link to="/">CryptoApp</Link>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
