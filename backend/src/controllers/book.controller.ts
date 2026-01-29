import { Request, Response } from "express";
import { Book } from "@bookwebapp/types";
import { SampleBooks } from "../SampleData";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    res.send({ body: SampleBooks });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  try {
    const book = SampleBooks.find((b) => b.key === req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.send({ body: book });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const newBook: Book = req.body;

  try {
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
};
