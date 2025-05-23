const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');


module.exports = {
  create,
  login
}

async function create(req, res) {

  try { 
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) { 
    res.status(400).json(err)
  }
}

// Helper functions
function createJWT(user) {

  return jwt.sign(
    {user},
    process.env.SECRET,
    {expiresIn: '24h'}
  )
}

async function login(req, res) {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error('Invalid username or password');
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error(err); // Log the error
    res.status(400).json(err);
  }
}

// helper functions
function createJWT(user) {
  return jwt.sign(
    {user},
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}