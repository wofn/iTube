import "dotenv/config";
//require('dotenv').config()를 사용하려면 필요한 곳에 계속 작성하기 번거로우니깐 import 사용
import "./db"; //파일 자체를 import, 이 파일을 import함으로써, 내 서버가 mongo에 연결된다.
import "./models/Video";
import "./models/User";
import app from "./server"; //server.js의 app을 작동할 수 있께 해준다.

const PORT = 4000;

const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // app.lisen()으로 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 된다.
