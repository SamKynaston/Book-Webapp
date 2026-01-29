import { Request, Response } from "express";
import { Book } from "@bookwebapp/types";
import { SampleBooks } from "../SampleData";
import { BookModel } from "../models/book.model";
import e from "cors";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.findAll();
    res.send({ body: books });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookKey = req.params.id as string;

  try {
    const book = await BookModel.findOne({
      where: { key: bookKey },
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.send({ body: book });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const newBook: Omit<Book, "id"> = req.body;

  try {
    const existingBook = await BookModel.findOne({
      where: { key: newBook.key },
    });

    if (existingBook) {
      return res.status(409).json({ error: "Book already exists" });
    }

    const createdBook = await BookModel.create(newBook);
    res.status(201).json(createdBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Book creation failed", error: error, body: req.body });
  }
};
