import { mongoConnect, getDb } from '../util/database.js';
import { products } from '../assets/fake-data.js';

const getProductsController = async (req, res) => {
  try {
    await mongoConnect();
    const db = getDb();
    const productsCollection = db.collection('products');
    const productsFromDB = await productsCollection.find().toArray();
    res.status(200).json(productsFromDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductIdController = (req, res) => {
  const { productId } = req.params;
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json('Could not find the product!');
  }
};

export { getProductsController, getProductIdController };
