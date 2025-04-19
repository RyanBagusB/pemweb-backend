import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Produk from "../models/Produk.js";
import Testimoni from "../models/Testimoni.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight request secara global
app.options("*", cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/produk", async (req, res) => {
  const produk = await Produk.find();
  res.json(produk);
});

app.post("/produk", async (req, res) => {
  const produk = new Produk(req.body);
  await produk.save();
  res.status(201).json(produk);
});

app.put("/produk/:id", async (req, res) => {
  const produk = await Produk.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(produk);
});

app.delete("/produk/:id", async (req, res) => {
  await Produk.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get("/testimoni", async (req, res) => {
  const data = await Testimoni.find();
  res.json(data);
});

app.post("/testimoni", async (req, res) => {
  const testimoni = new Testimoni(req.body);
  await testimoni.save();
  res.status(201).json(testimoni);
});

app.put("/testimoni/:id", async (req, res) => {
  const testimoni = await Testimoni.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(testimoni);
});

app.delete("/testimoni/:id", async (req, res) => {
  await Testimoni.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
