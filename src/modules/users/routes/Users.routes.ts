import { Router } from "express";
import UsersController from "../controller/UsersController";
import { Joi, Segments, celebrate } from "celebrate";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.index);
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

export default usersRouter;
