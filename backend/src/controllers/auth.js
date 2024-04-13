const getLoginController = async (req, res) => {
  try {
    const isLoggedIn = req.get('Cookie').split('=')[1].trim() === 'true';
    console.log('isLoggedIn', isLoggedIn);
    res.status(200).json('Login');
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch the orders.' });
  }
};

const postLoginController = async (req, res) => {
  try {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.status(200).json('Post Login');
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch the orders.' });
  }
};

export { getLoginController, postLoginController };
