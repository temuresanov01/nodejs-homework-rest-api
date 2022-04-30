const authServise = require('../../services/auth/index')

const login = async (req, res,) => {
  const { email, password } = req.body;
  const user = await authServise.getUser(email, password);
  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Invalid credentials",
    });
  }
  const token = authServise.getToken(user);
  await authServise.setToken(user.id, token);
  res
    .status(200)
    .json({ status: "success", code: 200, data: { token } });
};

module.exports =  login