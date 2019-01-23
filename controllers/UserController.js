const User = require("../models").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  const role = req.decoded.role;

  if (role === "admin") {
    User.findAll()
      .then(users => res.json({ users }))
      .catch(err => console.log(err));
  } else {
    const user = await User.findOne({where : {id : req.decoded.id}})
    res.json({user})
  }
};

exports.createUser = async (req, res) => {
  try {
    const SALT_WORK_FACTOR = 12;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    await User.update(
      { name: req.body.name, age: req.body.age, email: req.body.email },
      { where: { id: req.params.id } }
    );
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    res.json({ err });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    const user = await User.findAll();
    res.json({ user });
  } catch (err) {
    res.json({ err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      return res.send("Email NOT found!");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send("Password NOT valid!");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "7d" } // option
    );

    res.json({ message: "you are logged in", name: user.name, token });
  } catch (err) {
    res.send(console.log("Login Failure"));
    res.json({ err });
  }
};
