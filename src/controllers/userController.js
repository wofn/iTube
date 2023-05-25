import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";

  //비밀번호 서로 일치 확인
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호가 서로 일치하지 않습니다.",
    });
  }

  //username, email 중복되는지 체크
  const exists = await User.exists({
    $or: [{ username: req.body.username }, { email: req.body.email }],
    //username: req.body.username  = username
  });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "이미 사용 중인 username/email입니다.",
    });
  }
  await User.create({ name, username, email, password, location });
  res.redirect("/login");
};

export const edit = (req, res) => res.send("edit user");
export const remove = (req, res) => res.send("remove user");
export const login = (req, res) => res.send("login user");
export const logout = (req, res) => res.send("logout user");
export const see = (req, res) => res.send("see user");
