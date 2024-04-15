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

export { getLoginController, postLoginController, postLogoutController };
