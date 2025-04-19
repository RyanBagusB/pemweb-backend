import mongoose from 'mongoose';

const produkSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  harga: {
    type: Number,
    required: true
  },
  stok: {
    type: Number,
    required: true
  },
  kategori: {
    type: String,
    required: true
  },
  fotoProduk: {
    type: String,
    required: true
  }
});

const Produk = mongoose.model('Produk', produkSchema);
export default Produk;
