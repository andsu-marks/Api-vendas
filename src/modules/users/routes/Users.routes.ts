import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";
import UsersController from "../controller/UsersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controller/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
);

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  usersAvatarController.update,
)

export default usersRouter;
