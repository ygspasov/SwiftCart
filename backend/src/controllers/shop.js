// import { mongoConnect, getDb } from '../util/database.js';
import { Product } from '../models/product.js';
import { Cart } from '../models/cart.js';

const getProductsController = async (req, res) => {
  try {
    Product.fetchAll((products) => {
      res.status(200).json(products);
    });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get products' });
  }

  // try {
  //   await mongoConnect();
  //   const db = getDb();
  //   const productsCollection = db.collection('products');
  //   const productsFromDB = await productsCollection.find().toArray();
  //   res.status(200).json(productsFromDB);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

const getProductIdController = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json('Could not find the product!');
    }
  });
};

const getCartController = (req, res) => {
  try {
    Cart.getCart((cartItems) => {
      Product.fetchAll((products) => {
        const cartProducts = [];
        for (const product of products) {
          const cartProductData = cartItems.products.find((prod) => prod.id === product.id);
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        console.log('cartProducts', cartProducts);
        res.status(200).json(cartProducts);
      });
    });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get cart items' });
  }
};

const postCartController = (req, res) => {
  const { prodId } = req.body;
  Product.findById(prodId, (product) => {
    if (product) {
      Cart.addProduct(prodId, product.price);
      res.status(200).json(product);
    } else {
      res.status(404).json('Could not find the product.');
    }
  });
};

const deleteCartItemController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  const newCartItems = cartItems.filter((product) => product.id !== productId);
  res.status(200).json(newCartItems);
};

export {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
};
