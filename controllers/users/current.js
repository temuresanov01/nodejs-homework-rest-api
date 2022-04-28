const authServise = require('../../services/auth/index')

const current = async (req, res,) => {
  const user = await authServise.getUserByToken(req, res,);

  res.status(200).json({
    status: "success",
    code: 200,
    data: { email: user.email, subscription: user.subscription },
  });
};

module.exports = current