import mongoose from "mongoose";
//1. 데이터 형식 정의
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 50 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now }, //Date.now에서 ()를 붙이지 않는 이유는 바로 실행x
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//2. model을 만들기
const Video = mongoose.model("Video", videoSchema);
//3. 해당 모델을 default로 export
export default Video;

//4. server.js에 import
//import "./models/Video";

//db를 mongoose와 연결시켜서 video 모델을 인식시키는 거다.
