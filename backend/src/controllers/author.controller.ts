import { Request, Response } from "express";
import { Author } from "@bookwebapp/types";
import { AuthorModel } from "../models/author.model";

// Gets all authors and then returns in a structured JSON format
export const GET_ALL_AUTHORS = async (req: Request, res: Response) => {
  try {
    // Calls the Author's Database Model and then runs the .findAll() command, which gets every possible listing (SELECT * FROM AUTHORS).
    const authors = await AuthorModel.findAll();
    res.status(200).json({ body: authors, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve authors", success: false });
  }
};


// Uses an ID in the link's parameter in order to find a specific author
export const GET_AUTHOR = async (req: Request, res: Response) => {
  const authorKey = req.params.id as string;

  try {
    // Searches the Author's Database Model for an instance with a matching ID (SELECT * FROM AUTHORS WHERE ID = ID)
    const author = await AuthorModel.findOne({
      where: { id: authorKey },
    });

    // If there is no author, return a 404 (Content Not Found) Error with a message.
    if (!author) {
      return res.status(404).json({ error: "Author not found", success: false });
    }

    // Return the author
    res.status(200).json({ body: author, success: true });
  } catch (error) {

    // If there's an error for any reason, return 500 (Internal Server Error)
    res.status(500).json({ error: "Failed to retrieve author", success: false });
  }
};

// Uses the body structured validated by middleware to create a new author
export const CREATE_AUTHOR = async (req: Request, res: Response) => {
  const newAuthor = req.body;

  try {
    // Finds an author with the same name (SELECT * FROM AUTHORS WHERE name = NAME)
    const existingAuthor = await AuthorModel.findOne({
      where: { name: newAuthor.name },
    });

    // If they exist, return a 409 (Conflict) Error
    // It's done this way in order to give the client more dynamic error messages, as setting the attribute to unique and relying on that would otherwise return a 500, which would be inaccurate.

    if (existingAuthor) {
      return res.status(409).json({ error: "Author already exists", success: false });
    }

    // Create a new author using the instance specified
    const createdAuthor = await AuthorModel.create(newAuthor);

    // Return the author
    res.status(201).json({ body: createdAuthor, success: true });
  } catch (error) {
    // If any error occurs, return a 500 error. 
    res.status(500).json({ success: false });
  }
};

export const UPDATE_AUTHOR = async (req: Request, res: Response) => {
  // The ID of the Author
  const authorKey = req.params.id as string;

  // Validated body for any updates
  const updatedAuthor = req.body;

  try {
    // Finds the author using their ID (SELECT * FROM AUTHORS WHERE id = ID;)
    const existingAuthor = await AuthorModel.findOne({
      where: { id: authorKey },
    });

    // If the author does not exist, return a 404 to the client
    if (!existingAuthor) {
      return res.status(404).json({ error: "Author not found", success: false });
    }

    // If the author exists, then update it with the body
    await existingAuthor.update(updatedAuthor);

    // Return a success and the updated author
    res.status(200).json({ body: existingAuthor, success: true });
  } catch (error) {

    // Return a server error
    res.status(500).json({ success: false });
  }
};
