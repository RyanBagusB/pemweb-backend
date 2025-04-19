import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import Produk from "../models/Produk.js";
import Testimoni from "../models/Testimoni.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/produk", async (req, res) => {
  try {
    const produk = await Produk.find();
    res.json(produk);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil produk", error: err.message });
  }
});

app.get("/produk/:id", async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);

    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(produk);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil produk berdasarkan ID", error: err.message });
  }
});

app.post("/produk", async (req, res) => {
  try {
    const produk = new Produk({ _id: uuidv4(), ...req.body });
    await produk.save();
    res.status(201).json(produk);
  } catch (err) {
    res.status(400).json({ message: "Gagal menyimpan produk", error: err.message });
  }
});

app.put("/produk/:id", async (req, res) => {
  try {
    const produk = await Produk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(produk);
  } catch (err) {
    res.status(400).json({ message: "Gagal mengupdate produk", error: err.message });
  }
});

app.delete("/produk/:id", async (req, res) => {
  try {
    await Produk.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Gagal menghapus produk", error: err.message });
  }
});

app.get("/testimoni", async (req, res) => {
  try {
    const data = await Testimoni.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil testimoni", error: err.message });
  }
});

app.post("/testimoni", async (req, res) => {
  try {
    const testimoni = new Testimoni({ _id: uuidv4(), ...req.body });
    await testimoni.save();
    res.status(201).json(testimoni);
  } catch (err) {
    res.status(400).json({ message: "Gagal menyimpan testimoni", error: err.message });
  }
});

app.put("/testimoni/:id", async (req, res) => {
    try {
    const { status } = req.body; 

    const testimoni = await Testimoni.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!testimoni) {
      return res.status(404).json({ message: "Testimoni tidak ditemukan" });
    }

    res.json(testimoni);
  } catch (err) {
    res.status(400).json({ message: "Gagal mengupdate status testimoni", error: err.message });
  }
});


app.delete("/testimoni/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await Testimoni.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Gagal menghapus testimoni", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
