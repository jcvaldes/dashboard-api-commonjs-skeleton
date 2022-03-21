const User = require("../../models/user");

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).send({ message: "Error interno de servidor." });
    }
    if (!users) {
      return res
        .status(404)
        .send({ message: "No se han encontrado ningún usuario." });
    }
    return res.status(200).send({ users });
  });
};

module.exports = {
  getUsers,
};
