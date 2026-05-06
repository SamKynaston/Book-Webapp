import { Request, Response } from "express";
import { CreateBookInput } from "@bookwebapp/types";
import { BookModel } from "../models/book.model";
import { AuthorModel } from "../models/author.model";
import { UserModel } from "../models/user.model";

// Gets all books and returns to the client
export const GET_ALL_BOOKS = async (req: Request, res: Response) => {
  try {
    // NOTE: This is not an optimal way of performing this. In real world applications, the developer should opt to use pagination.
    // Includes each books's authors table (Many-to-Many relationship) with AuthorModel
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

    // Return a fulfilled status alongside all found books.
    res.status(201).json({ body: books, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books", message: error, success: false });
  }
};

// Gets an individual using book using an ID as a parameter
export const GET_BOOK = async (req: Request, res: Response) => {
  // The book's ID
  const bookId = req.params.id as string;

  try {
    // Using the ID, find the book and then its joining table with AuthorModel. 
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

    // If there is no book, return a 404 (Not Found) error.
    if (!book) {
      return res.status(404).json({ error: "Book not found", success: false });
    }

    // If there is a book, return a fulfilled status and the body of the found model.
    res.status(201).json({ body: book, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book", success: false });
  }
};

// Allows for the deletion of books using an ID as a parameter
export const DELETE_BOOK = async (req: Request, res: Response) => {
  const bookId = req.params.id as string;

  try {
    // Find the book in the database (SELECT * FROM Books WHERE id = ID;)
    const book = await BookModel.findOne({
      where: { id: bookId },
    });

    // If the book is not found, return a 404
    if (!book) {
      return res.status(404).json({ error: "Book not found", success: false });
    }

    // Destroy the book if found
    book.destroy()

    // Return a success
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book", success: false });
  }
};

// Creates a book using the body that was validated in the middleware
export const CREATE_BOOK = async (req: Request, res: Response) => {
  // Validated body for the new book
  const newBook: CreateBookInput = req.body;

  try {
    // Check to see if the book currently exists using its title
    // NOTE: Not optimal. In the real world a programmer should use its ISBN code.
    const existingBook = await BookModel.findOne({
      where: { title: newBook.title },
    });
    
    // If it exists, return a 409 (conflict) error.
    if (existingBook) {
      return res.status(409).json({ message: "Book already exists", success: false });
    }

    // If it does not exist, then create it
    const createdBook = await BookModel.create({
      title: newBook.title,
      first_publish_year: newBook.first_publish_year,
      cover_id: newBook.cover_id,
      is_recommended: newBook.is_recommended,
    });

    // Use the body's authors array to set the authors for the book. 
    // NOTE: Frontend currently does not support this.
    if (newBook.authors && newBook.authors.length > 0) {
      await createdBook.setAuthors(newBook.authors);
    }

    // Get the book and its authors 
    // NOTE: Wasn't sure if createdBook would include this table or what else it would get, so opted to get the whole table again. Not optimal.
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

    // Return the book and a fulfilled status.
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
      is_recommended: updatedBook.is_recommended,
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

// User Functions
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
    res.status(500).json({ success: false })  
  }
}

export const IS_FAVOURITE_BOOK = async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id as string, 10);
    const userId = req.user.id as number;

    try {
      const user = await UserModel.findOne({
        where: { id: userId }
      })  

      const isFavourite = await user?.hasFavourite(bookId);

      res.status(200).json({ success: true, favourited: isFavourite || false })
    } catch (err) {
      res.status(500).json({ success: false })  
    }
}