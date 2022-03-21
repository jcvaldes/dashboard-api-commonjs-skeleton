const moment = require("moment");
const jwt = require("../../services/jwt");
const User = require("../../models/user");

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  const isTokenExpired = verifyToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ message: "token expired" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);

    User.findById(id, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor" });
      }
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado" });
      } else {
        const accessToken = jwt.createAccessToken(userStored);
        res.status(200).send({ accessToken, refreshToken });
      }
    });
  }
};

const verifyToken = (token) => {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();
  if (currentDate > exp) {
    return true;
  }
  return false;
};

module.exports = {
  refreshToken,
};
