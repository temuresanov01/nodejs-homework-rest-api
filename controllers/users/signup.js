const authServise = require('../../services/users/index')

const signup = async (req, res,) => {
  const { email } = req.body;
  const isUserExist = await authServise.isUserExist(email);
  if (isUserExist) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already exist!",
    });
  }
  const data = await authServise.create(req.body);

  res.status(200).json({ status: "success", code: 200, data });
};

module.exports = signup