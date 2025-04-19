import mongoose from "mongoose";
import Produk from "../models/Produk.js";
import dotenv from "dotenv";

dotenv.config();

const produkData = [
  {
    nama: 'Produk 1',
    deskripsi: 'Deskripsi produk 1',
    harga: 100000,
    stok: 10,
    kategori: 'Elektronik',
    fotoProduk: 'http://example.com/images/produk1.jpg'
  },
  {
    nama: 'Produk 2',
    deskripsi: 'Deskripsi produk 2',
    harga: 150000,
    stok: 20,
    kategori: 'Elektronik',
    fotoProduk: 'http://example.com/images/produk2.jpg'
  },
  {
    nama: 'Produk 3',
    deskripsi: 'Deskripsi produk 3',
    harga: 200000,
    stok: 15,
    kategori: 'Peralatan Rumah Tangga',
    fotoProduk: 'http://example.com/images/produk3.jpg'
  }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Database connected...');
    
    // Hapus semua produk yang ada sebelum memasukkan data baru
    await Produk.deleteMany();
    
    // Tambahkan produk ke dalam database
    await Produk.insertMany(produkData);
    
    console.log('Seeder data berhasil ditambahkan!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('Database connection error: ', err);
  });
