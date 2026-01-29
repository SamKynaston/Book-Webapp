import { Request, Response } from "express";
import { Author } from "@bookwebapp/types";
import { AuthorModel } from "../models/author.model";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await AuthorModel.findAll();
    res.send({ body: authors });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve authors" });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  const authorKey = req.params.id as string;

  try {
    const author = await AuthorModel.findOne({
      where: { id: authorKey },
    });
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.send({ body: author });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve author" });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const newAuthor = req.body;

  try {
    const existingAuthor = await AuthorModel.findOne({
      where: { name: newAuthor.name },
    });

    if (existingAuthor) {
      return res.status(409).json({ error: "Author already exists" });
    }

    const createdAuthor = await AuthorModel.create(newAuthor);
    res.status(201).json(createdAuthor);
  } catch (error) {
    res.status(500).json({
      message: "Author creation failed",
      error: error,
      body: req.body,
    });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const authorKey = req.params.id as string;
  const updatedAuthor = req.body;

  try {
    const existingAuthor = await AuthorModel.findOne({
      where: { id: authorKey },
    });

    if (!existingAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    await existingAuthor.update(updatedAuthor);
    res.send({ body: existingAuthor });
  } catch (error) {
    res.status(500).json({
      message: "Author update failed",
      error: error,
      body: req.body,
    });
  }
};
