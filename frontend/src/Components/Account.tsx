import React from "react";
import { Link } from "react-router-dom";

interface AccountBtnProps {
  accountToken: string;
}

export const Account = ({ accountToken }: AccountBtnProps) => {
  const isLoggedIn = !!accountToken && accountToken !== "null";

  return (
    <>
      {isLoggedIn ? (
        <Link to="/account" className="Navigation-Button">
          Account
        </Link>
      ) : (
        <Link to="/login" className="Navigation-Button">
          Login
        </Link>
      )}
    </>
  );
};
