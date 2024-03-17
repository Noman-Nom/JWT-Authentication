const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

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
];

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated");

  if (!refreshTokens.includes(refreshToken)){
    return res.status(403).json("Refresh token is not valid");
  }
    jwt.verify(refreshToken, "myRefreshSecreteKey", (err, user) => {

        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = geenrateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.json({  
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });

    });
  
   
}

     


);

const geenrateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    "myRefreshSecreteKey"
  );
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    // res.json(user);
    const accessToken = geenrateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken: accessToken,
    });
  } else {
    res.status(400).json({ message: "Invalid Username or Password" });
  }

  // res.json("Working")  for testing postman
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
    res.status(401).json({ message: "You are not authenticated" });
  }
};

app.delete("/api/users/:userId", verify, (req, res) => {
  const userId = req.params.userId;
  if (req.user.id === Number(userId) || req.user.isAdmin) {
    res.json("User has been deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
});

// number issue  This modification ensures that you're comparing numbers with numbers, which should
// resolve the issue of a non-admin user being unable to delete their own account.

app.listen(5000, () => console.log("Server Running"));
