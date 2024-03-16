import { Request, Response, Router } from "express";
import url from "url";
import { userController } from "../controllers/user.controller";
const router: Router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.status(200).json({});
});
router.get("/find/:user", (req: Request, res: Response) => {
  const user = req.params.user;
  userController.getUser(user).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(500).json(error);
  });
});
router.get("/all", (req: Request, res: Response) => {
  userController.getAllUsersInTheLast2Hours().then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(500).json(error);
  })
});
router.post("/create", (req: Request, res: Response) => {
  const user = req.body;
  userController.createUser(user).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(500).json(error);
  });
});
router.post("/update-offset", (req: Request, res: Response) => {
  const user = req.body;
  userController.modifyUserOffset(user).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(500).json(error);
  });
});
router.post("/update-modified/:id", (req: Request, res: Response) => {
  const user = req.params.id;
  userController.modifyUserModifiedDate(user).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(500).json(error);
  });
});

export const UserRouter: Router = router;
