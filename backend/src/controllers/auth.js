const getLoginController = async (req, res) => {
  try {
    res.status(200).json('Login page');
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch the orders.' });
  }
};

export { getLoginController };
