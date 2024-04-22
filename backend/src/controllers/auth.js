import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

const postSignupController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((userDoc) => {
      if (userDoc) {
        return;
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
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
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((user) => {
      bcrypt.compare(password, user.password).then((doMatch) => {
        //Comparing the password the user entered with the password stored in the db
        if (doMatch) {
          console.log('passwords match');
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save();
          res.status(200).json({ isLoggedIn: true });
          return;
        }
      });
    });
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
