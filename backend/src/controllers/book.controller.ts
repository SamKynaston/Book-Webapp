import { Request, Response } from "express";
import { CreateBookInput } from "@bookwebapp/types";
import { BookModel } from "../models/book.model";
import { AuthorModel } from "../models/author.model";
import UserModel from "../models/user.model";

export const GET_ALL_BOOKS = async (req: Request, res: Response) => {
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
    res.status(200).json({ body: books, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books", message: error, success: false });
  }
};

export const GET_BOOK = async (req: Request, res: Response) => {
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
      return res.status(404).json({ error: "Book not found", success: false });
    }

    res.status(200).json({ body: book, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book", success: false });
  }
};

export const CREATE_BOOK = async (req: Request, res: Response) => {
  const newBook: CreateBookInput = req.body;

  try {
    const existingBook = await BookModel.findOne({
      where: { title: newBook.title },
    });

    if (existingBook) {
      return res.status(409).json({ message: "Book already exists", success: false });
    }

    const createdBook = await BookModel.create({
      title: newBook.title,
      first_publish_year: newBook.first_publish_year,
      cover_id: newBook.cover_id,
      is_recommended: newBook.is_recommended,
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

    res.status(201).json({ body: bookWithAuthors, success: true });
  } catch (error) {
    res.status(500).json({ error: "Book creation failed", success: false });
  }
};

export const UPDATE_BOOK = async (req: Request, res: Response) => {
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
      isRecommended: updatedBook.is_recommended,
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

    res.status(200).json({ body: bookWithAuthors, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Book update failed", success: false });
  }
};

export const FAVOURITE_BOOK = async (req: Request, res: Response) => {
  const bookId = req.params.id as string;
  const userId = req.user.id as string;

  try {
    const user = await UserModel.findOne({
      where: { id: userId }
    })  

    const book = await BookModel.findOne({
      where: { id: bookId }
    })

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    user?.addFavourite(book)

    return res.status(200).json({ success: true })
  } catch(err) {
    res.status(500).json({ success: false})  
  }
}


export const UNFAVOURITE_BOOK = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id as string, 10);
  const userId = req.user.id as number;

  try {
    const user = await UserModel.findOne({
      where: { id: userId }
    })  

    await user?.removeFavourite(bookId)

    return res.status(200).json({ success: true })
  } catch(err) {
    res.status(500).json({ success: false})  
  }
}
