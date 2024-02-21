import { Request, Response, Router } from "express";
import url from "url";
const router: Router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.status(200).json({});
});

export const UserRouter: Router = router;
