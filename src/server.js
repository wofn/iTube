import "./db"; //파일 자체를 import, 이 파일을 import함으로써, 내 서버가 mongo에 연결된다.
import "./models/Video";
//우리의 서버, 앱을 설정
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4015;

const app = express(); //epress application을 만들기
const logger = morgan("dev");

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

const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // app.lisen()으로 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 된다.
