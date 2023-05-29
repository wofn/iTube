//우리의 서버, 앱을 설정
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo"; //세션을 db에 저장
import globalRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

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

//이 미들웨어가 사이트로 들어오는 모두를 기억하게 될거다.
//서버에서는 session 미들웨어가 브라우저한테 텍스트를 보낼거다.
//내가 새로 고침할 때마다, 백엔드에 요청을 보낼 때마다 텍스트가 같이 백엔드로 보내짐
//브라우저가 벡엔드로 쿠키를 보내도록 되어있다.

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, //세션이 새로 만들어지고 수정이 된적 없을 때 uninitialized(초기화되지 않은)
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/", globalRouter); //라우터 쓰기
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
