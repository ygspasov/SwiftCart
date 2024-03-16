// import { mongoConnect, getDb } from '../util/database.js';
import { Product } from '../models/product.js';
import { Cart } from '../models/cart.js';

const getProductsController = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    console.log('products', products);
    res.status(200).json(products);
  } catch (err) {
    console.log('Error fetching products:', err);
    res.status(400).json({ error: 'Cannot get products' });
  }
};

const getProductIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json('Could not find the product!');
  }
};

const getCartController = (req, res) => {
  try {
    Cart.getCart((cartItems) => {
      Product.fetchAll((products) => {
        const cartProducts = { products: [], totalPrice: cartItems.totalPrice };
        for (const product of products) {
          const cartProductData = cartItems.products.find((prod) => prod.id === product.id);
          if (cartProductData) {
            cartProducts.products.push({
              productData: product,
              qty: cartProductData.qty,
            });
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
  Product.findById(productId, (product) => {
    if (product) {
      Cart.deleteProduct(productId, product.price);
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Could not find the product.' });
    }
  });
};

export {
  getProductsController,
  getProductIdController,
  getCartController,
  postCartController,
  deleteCartItemController,
};
