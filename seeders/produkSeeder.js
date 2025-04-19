import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import Produk from '../models/Produk.js'; 

dotenv.config();

const seedProduk = [
  {
    _id: uuidv4(),
    nama: "Kaos Polos Hitam",
    deskripsi: "Kaos polos warna hitam dengan bahan katun combed 30s.",
    harga: 75000,
    kategori: "Pakaian",
    foto: "https://example.com/images/kaos-hitam.jpg"
  },
  {
    _id: uuidv4(),
    nama: "Sepatu Sneakers Putih",
    deskripsi: "Sepatu sneakers warna putih cocok untuk casual dan formal.",
    harga: 225000,
    kategori: "Sepatu",
    foto: "https://example.com/images/sneakers-putih.jpg"
  },
  {
    _id: uuidv4(),
    nama: "Tas Ransel Kulit",
    deskripsi: "Tas ransel berbahan kulit sintetis dengan kompartemen laptop.",
    harga: 180000,
    kategori: "Aksesoris",
    foto: "https://example.com/images/tas-ransel.jpg"
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Terhubung ke MongoDB");

    await Produk.deleteMany({});
    console.log("🗑️  Semua produk lama dihapus");

    await Produk.insertMany(seedProduk);
    console.log("🌱 Produk berhasil disimpan:");

    seedProduk.forEach(p => console.log(`- ${p.nama}`));

    process.exit();
  })
  .catch(err => {
    console.error("❌ Gagal melakukan seeding:", err);
    process.exit(1);
  });
