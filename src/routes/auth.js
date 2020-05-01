const router = require('express').Router();
const { auth } = require('../../firebase');
const { registerValidation } = require('../validator/registerValidate');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const createdUser = await auth.createUser(user);
    res.send(createdUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
