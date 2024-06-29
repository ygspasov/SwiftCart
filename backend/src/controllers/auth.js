import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

const postSignupController = async (req, res) => {
  const name = req.body.name;
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
            name: name,
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ isLoggedIn: false, message: 'No such user exists.' });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      await req.session.save();
      return res.status(200).json({ isLoggedIn: true, message: 'Logged in!', user });
    } else {
      return res
        .status(401)
        .json({ isLoggedIn: false, message: 'Invalid credentials. Please try again.' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ isLoggedIn: false, message: 'Failed to login due to server error.' });
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
