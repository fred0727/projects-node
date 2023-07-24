const User = require('../models/user.model');

exports.validateCreateUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(200).json({
      status: 'warning',
      message: 'Not created, the email already exists',
    });
  }

  next();
};

exports.validateEditeUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(200).json({
      status: 'warning',
      message: 'Not update, the email already exists',
    });
  }

  next();
};
