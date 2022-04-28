const authServise = require('../../services/users/index')

const logout = async (req, res,) => {
  await authServise.setToken(req.user.id, null);
  res
    .status(204)
    .json({ status: "success", code: 200, data: {} });
};

module.exports = logout