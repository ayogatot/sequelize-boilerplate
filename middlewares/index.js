const jwt = require("jsonwebtoken");
const User = require("../models").user;

exports.isAuthenticated = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (token === undefined) {
    return res.send("token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if(user === null){
        return res.send("Account not found!")
    }

    req.decoded = decoded
    next()

  } catch (err) {
    res.send(err);
  }
};

// yang punya split itu String , array itu gk punya.. nah kalau string di split jadi array
