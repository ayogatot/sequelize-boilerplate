const User = require("../models").user;

exports.getUser = (req, res) => {
  User.findAll()
    .then(users => res.json({ users }))
    .catch(err => console.log(err));
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json({ user });
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
