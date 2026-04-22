import { Request, Response } from "express";
import { CreateBookInput } from "@bookwebapp/types";
import { BookModel } from "../models/book.model";
import { AuthorModel } from "../models/author.model";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.findAll({
      include: [
        {
          model: AuthorModel,
          as: "authors",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    res.send({ body: books });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.id as string;

  try {
    const book = await BookModel.findOne({
      where: { id: bookId },
      include: [
        {
          model: AuthorModel,
          as: "authors",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
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
  const newBook: CreateBookInput = req.body;

  try {
    const existingBook = await BookModel.findOne({
      where: { title: newBook.title },
    });

    if (existingBook) {
      return res.status(409).json({ error: "Book already exists" });
    }

    const createdBook = await BookModel.create({
      title: newBook.title,
      first_publish_year: newBook.first_publish_year,
      cover_id: newBook.cover_id,
      isRecommended: newBook.isRecommended,
    });

    if (newBook.authors && newBook.authors.length > 0) {
      await createdBook.setAuthors(newBook.authors);
    }

    const bookWithAuthors = await BookModel.findOne({
      where: { id: createdBook.id },
      include: [
        {
          model: AuthorModel,
          as: "authors",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(201).json(bookWithAuthors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Book creation failed", error: error, body: req.body });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.id as string;
  const updatedBook: CreateBookInput = req.body;

  try {
    const book = await BookModel.findOne({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await book.update({
      title: updatedBook.title,
      first_publish_year: updatedBook.first_publish_year,
      cover_id: updatedBook.cover_id,
      isRecommended: updatedBook.isRecommended,
    });

    if (updatedBook.authors && updatedBook.authors.length > 0) {
      await book.setAuthors(updatedBook.authors);
    }

    const bookWithAuthors = await BookModel.findOne({
      where: { id: book.id },
      include: [
        {
          model: AuthorModel,
          as: "authors",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(bookWithAuthors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Book update failed", error: error, body: req.body });
  }
};
