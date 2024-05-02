import { Product } from '../models/product.js';
const getProductsController = async (req, res) => {
  console.log('admin products');
  try {
    Product.find()
      .populate('userId')
      .then((products) => {
        console.log('products', products);
        res.status(200).json(products);
      });
  } catch (err) {
    res.status(400).json({ error: 'Cannot get products!' });
  }
};

const postProductController = (req, res) => {
  const { name, imageUrl, description, price } = req.body;
  console.log('req.user', req.user);
  const product = new Product({
    name: name,
    imageUrl: imageUrl,
    description: description,
    price: price,
    userId: req.user,
  });
  if (product) {
    product.save();
    res.status(200).json({ product: product, message: 'Product added' });
  } else {
    res.status(404).json('Could not find the product.');
  }
};

const editProductController = (req, res) => {
  const { name, imageUrl, description, price, id } = req.body;
  // const updatedProduct = new Product(name, imageUrl, description, price, new mongodb.ObjectId(id));
  Product.findById(id)
    .then((product) => {
      product.name = name;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
      // updatedProduct.save();
    })
    .then(() => res.status(200).send(id))
    .catch((err) => console.log(err));
};

const deleteProductController = (req, res) => {
  const { productId } = req.params;
  console.log('productId', productId);
  Product.findByIdAndDelete(productId).then(() => {
    console.log('Product deleted');
    res.status(200).json(productId);
  });
};

export {
  getProductsController,
  postProductController,
  editProductController,
  deleteProductController,
};
