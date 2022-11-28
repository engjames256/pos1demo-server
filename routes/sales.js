import express from "express";
const router = express.Router();

import {
  getAllSales,
  createSale,
  getSale,
  updateSale,
  deleteSale,
} from "../controllers/sales.js";

router.route("/").get(getAllSales).post(createSale);
router.route("/:id").get(getSale).patch(updateSale).delete(deleteSale);

export default router;
