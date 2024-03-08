import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import SessionsControllerr from "../controller/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsControllerr();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionsController.create
);

export default sessionsRouter;
