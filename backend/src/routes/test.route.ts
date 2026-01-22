import Express, { Request, Response } from "express";
import { SampleBooks } from "../SampleData";

const router = Express.Router();

router.get("/works", (req: Request, res: Response) => {
  res.send({ body: SampleBooks });
});

router.get("/works/:id", (req: Request, res: Response) => {
  const book = SampleBooks.find((b) => b.key === req.params.id);

  if (!book) return res.status(404).send({ error: "Book not found" });
  res.send({ body: book });
});

export default router;
