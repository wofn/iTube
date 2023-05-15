import mongoose from "mongoose";
//1. 데이터 형식 정의
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});
//2. model을 만들기
const video = mongoose.model("video", videoSchema);
//3. 해당 모델을 default로 export
export default video;

//4. server.js에 import
//import "./models/Video";

//db를 mongoose와 연결시켜서 video 모델을 인식시키는 거다.
