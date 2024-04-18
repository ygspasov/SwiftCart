import { User } from '../models/user.js';

const postSignupController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((userDoc) => {
      if (userDoc) {
        return;
      }
      const user = new User({
        email: email,
        password: password,
        cart: { items: [] },
      });
      return user.save();
    });
    res.status(200).json('Signup');
  } catch (err) {
    res.status(400).json({ error: 'Failed to sign up.' });
  }
};

const getLoginController = async (req, res) => {
  try {
    console.log('req.session.isLoggedIn', req.session.isLoggedIn);
    res.status(200).json('Login');
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch the orders.' });
  }
};

const postLoginController = async (req, res) => {
  try {
    req.session.isLoggedIn = true;
    res.status(200).json('Post Login');
  } catch (err) {
    res.status(400).json({ error: 'Failed to login.' });
  }
};

const postLogoutController = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json('Post Logout');
  } catch (err) {
    res.status(400).json({ error: 'Failed to logout.' });
  }
};

export { postSignupController, getLoginController, postLoginController, postLogoutController };
