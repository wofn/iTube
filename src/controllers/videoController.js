let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `watching ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params; //route로 부터 id를 얻어와서
  console.log(req.body);
  const { title } = req.body; //videos/id패키지로 redirect 시켜줄거다.
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "upload video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  // here we will add a video to the videos
  videos.push(newVideo);
  return res.redirect("/");
};

/*
res.render.end() 연결 종료
res.redirect() 브라우저가 redirect(자동으로 이동)하도록 하는거다.
*/
