const express = require("express");
const app = express();
 const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());

const users = [
  {
    id: 1,
    username: "Muhammad Noman",
    password: "noman1234",
    isAdmin: true,
  },
  {
    id: 2,
    username: "Muhammad Anwar",
    password: "Anwar1234",
    isAdmin: false,
  },
  {
    id: 3,
    username: "Saifullah",
    password: "saif1234",
    isAdmin: false,
  },
  {
    id: 4,
    username: "hassan",
    password: "hassan1234",
    isAdmin: false,
  },
];

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated");

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid");
  }

  jwt.verify(refreshToken, "myRefreshSecreteKey", (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Invalid refresh token");
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "60s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecreteKey");
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken, 
    });
  } else {
    res.status(400).json({ message: "Invalid Username or Password" });
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken) {
    jwt.verify(refreshToken, "myRefreshSecreteKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

app.post("/api/logout", verifyRefreshToken, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.status(200).json("You logged out successfully");
});


app.delete("/api/users/:userId", verify, (req, res) => {
  const userId = req.params.userId;
  if (req.user.id === Number(userId) || req.user.isAdmin) {
    res.json("User has been deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
});

app.post("/api/logout" , verify , (req , res)=>{

  const refreshToken = req.body.token;

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully");

});

app.listen(5000, () => console.log("Server Running"));
