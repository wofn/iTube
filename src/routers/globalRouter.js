import express from "express";
import { home, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router(); //라우터 생성

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

//globalRouter export 하는 법
export default globalRouter; //export하는 법
