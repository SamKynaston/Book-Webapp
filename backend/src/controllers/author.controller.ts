import { Request, Response } from "express";
import { Author } from "@bookwebapp/types";
import { AuthorModel } from "../models/author.model";

export const GET_ALL_AUTHORS = async (req: Request, res: Response) => {
  try {
    const authors = await AuthorModel.findAll();
    res.status(200).json({ body: authors, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve authors", success: false });
  }
};

export const GET_AUTHOR = async (req: Request, res: Response) => {
  const authorKey = req.params.id as string;

  try {
    const author = await AuthorModel.findOne({
      where: { id: authorKey },
    });
    if (!author) {
      return res.status(404).json({ error: "Author not found", success: false });
    }

    res.status(200).json({ body: author, success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve author", success: false });
  }
};

export const CREATE_AUTHOR = async (req: Request, res: Response) => {
  const newAuthor = req.body;

  try {
    const existingAuthor = await AuthorModel.findOne({
      where: { name: newAuthor.name },
    });

    if (existingAuthor) {
      return res.status(409).json({ error: "Author already exists", success: false });
    }

    const createdAuthor = await AuthorModel.create(newAuthor);
    res.status(201).json({ body: createdAuthor, success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const UPDATE_AUTHOR = async (req: Request, res: Response) => {
  const authorKey = req.params.id as string;
  const updatedAuthor = req.body;

  try {
    const existingAuthor = await AuthorModel.findOne({
      where: { id: authorKey },
    });

    if (!existingAuthor) {
      return res.status(404).json({ error: "Author not found", success: false });
    }

    await existingAuthor.update(updatedAuthor);
    res.status(200).json({ body: existingAuthor, success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
