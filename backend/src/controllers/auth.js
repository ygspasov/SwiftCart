import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

const postSignupController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((userDoc) => {
      if (userDoc) {
        res.status(409).json({ isLoggedIn: false, message: 'The user already exists.' });
        return;
      } else {
        res.status(200).json({ isLoggedIn: true, message: 'Signed up' });

        return bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        });
      }
    });
  } catch (err) {
    res.status(400).json({ error: 'Failed to sign up.' });
  }
};

const getLoginController = async (req, res) => {
  try {
    res.status(200).json('Logged in');
  } catch (err) {
    res.status(400).json({ error: 'Failed to log in' });
  }
};

const postLoginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((user) => {
      bcrypt.compare(password, user.password).then((doMatch) => {
        console.log('doMatch', doMatch);
        //Comparing the password the user entered with the password stored in the db
        if (doMatch) {
          console.log('passwords match');
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save();
          res.status(200).json({ isLoggedIn: true, message: 'Logged in!' });
        } else {
          res
            .status(401)
            .json({ isLoggedIn: false, message: 'Invalid credentials. Please try again.' });
        }
      });
    });
  } catch (err) {
    res.status(400).json({ isLoggedIn: false, message: 'Failed to login.' });
  }
};

const postLogoutController = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ isLoggedIn: false });
  } catch (err) {
    res.status(400).json({ error: 'Failed to logout.' });
  }
};

export { postSignupController, getLoginController, postLoginController, postLogoutController };
