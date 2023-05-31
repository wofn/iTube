import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

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
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "login" });

export const postLogin = async (req, res) => {
  //계정이 존재하는지 체크
  //패스워드 일치하는지 체크
  const pageTitle = "login";
  const { username, password } = req.body; //입력한 password값 가져오기
  const user = await User.findOne({ username }); //DB에서 user 정보 가져오기
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력한 username을 가진 User가 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password); //uesr password, database password
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "잘못된 패스워드",
    });
  }
  //req.session.loggedIn, req.session.user를 session DB에(정확히는 백엔드의 메모리에)
  //loggedIn, user라는 항목을 만들고 각각 "true"와 "user"라는 정보를 추가할 것을 "요청"한다
  req.session.loggedIn = true;
  req.session.user = user; //세션에 DB의 user정보를 저장
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString(); //string으로 쭉 이어져서 나온다
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token"; //우라가 사용할 baseUrl
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code, //github가 주는 코드, 주소창에 뜬다.
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true //깃헙이 주는 list에서 primary이면서 verified된 email객체 찾기
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    const existingUser = await User.findOne({ email: emailObj.email }); //깃헙이 주는 같은 email을 가진 user가 이미 이다면 로그인
    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    } else {
      //계정 생성! email로 user가 없으니까 계정을 생성해야 된다.
      const user = await User.create({
        name: userData.name ? userData.name : "Unknown",
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("edit user");
export const remove = (req, res) => res.send("remove user");
export const logout = (req, res) => res.send("logout user");
export const see = (req, res) => res.send("see user");
