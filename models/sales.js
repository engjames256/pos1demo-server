import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

const saleSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    username: {
      type: String,
      required: true,
    },
    email: { type: String },
    phone: { type: String },
    products: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Must provide Product Price"],
    },
    staffName: { type: String },
    staffImage: { type: String },
    image: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

saleSchema.plugin(AutoIncrement, {
  id: "sale_seq",
  inc_field: "id",
});

const sale = mongoose.model("sale", saleSchema);

export default sale;
