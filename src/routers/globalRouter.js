import express from "express";
import { trending, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router(); //라우터 생성

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

//globalRouter export 하는 법
export default globalRouter; //export하는 법
