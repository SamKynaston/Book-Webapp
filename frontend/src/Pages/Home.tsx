import Page from "../Components/Page";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@bookwebapp/types";
import { BookBtn } from "../Components/BookBtn";
import { getAllBooks, getBookLink } from "../Services/Books.service";

interface HomeProps {
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Home: React.FC<HomeProps> = ({ }) => {
  return (
    <Page>
      DEBUG
    </Page>
  );
};

export default Home;
