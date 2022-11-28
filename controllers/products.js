import Product from "../models/products.js";
import asyncWrapper from "../middleware/async.js";

export const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
});

export const createProduct = asyncWrapper(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
});

export const getProduct = asyncWrapper(async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    return res.status(404).json({ msg: `No product with id: ${productID}` });
  }
  res.status(200).json({ product });
});

export const deleteProduct = asyncWrapper(async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    return res.status(404).json({ msg: `No product with id: ${productID}` });
  }
  res.status(200).json({ product });
});

export const updateProduct = asyncWrapper(async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findByIdAndUpdate(
    { _id: productID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return res.status(404).json({ msg: `No product with id: ${productID}` });
  }

  res.status(200).json({ product });
});
