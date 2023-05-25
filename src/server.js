//우리의 서버, 앱을 설정
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express(); //epress application을 만들기
const logger = morgan("dev"); //밑에 상태 뜨게 해주는 거 404 등

app.set("view engine", "pug"); //view engine을 pug로 설정!
//express가 views디렉토리에서 pug파일을 찾도록 설정되어 있어서 우리가 해야 하는 것은
//res.render로 home.pug를 렌더링하는 거다.
app.set("views", process.cwd() + "/src/views"); //디폴트 값 바꾸기
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// express application이 form의 value를 이해하고
//우리가 쓸수 잇는 멋진 형식으로 바꿔줄 것이다.
app.use("/", globalRouter); //라우터 쓰기
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
