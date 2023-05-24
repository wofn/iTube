import mongoose from "mongoose";

//mongoose는 itube라는 mongodb database로 연결
mongoose.connect("mongodb://127.0.0.1:27017/itube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//connection에 대한 엑세스 주기
const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB"); //우리가 db에 연결 됬다는 의미
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError); //on은 계속
db.once("open", handleOpen); //once는 한번만
