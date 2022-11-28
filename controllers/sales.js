import Sale from "../models/sales.js";
import asyncWrapper from "../middleware/async.js";

export const getAllSales = asyncWrapper(async (req, res) => {
  const sales = await Sale.find({});
  res.status(200).json({ sales });
});

export const createSale = asyncWrapper(async (req, res) => {
  const sale = await Sale.create(req.body);
  res.status(201).json({ sale });
});

export const getSale = asyncWrapper(async (req, res) => {
  const { id: saleID } = req.params;
  const sale = await Sale.findOne({ _id: saleID });
  if (!sale) {
    return res.status(404).json({ msg: `No product with id: ${saleID}` });
  }
  res.status(200).json({ sale });
});

export const deleteSale = asyncWrapper(async (req, res) => {
  const { id: saleID } = req.params;
  const sale = await Sale.findOneAndDelete({ _id: saleID });
  if (!sale) {
    return res.status(404).json({ msg: `No product with id: ${saleID}` });
  }
  res.status(200).json({ sale });
});

export const updateSale = asyncWrapper(async (req, res) => {
  const { id: saleID } = req.params;

  const sale = await Sale.findByIdAndUpdate({ _id: saleID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!sale) {
    return res.status(404).json({ msg: `No product with id: ${saleID}` });
  }

  res.status(200).json({ sale });
});
