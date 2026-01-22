import Express, { Request, Response } from "express";
import { SampleBooks } from "../SampleData";

const router = Express.Router();

router.get("/test", (req: Request, res: Response) => {
  res.send({ body: SampleBooks });
});

export default router;
