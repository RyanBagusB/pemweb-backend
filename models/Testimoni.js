import mongoose from 'mongoose';

const testimoniSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  namaPengirim: { type: String, required: true },
  fotoProduk: { type: String, required: true },
  rating: { type: Number, required: true },
  pesan: { type: String, required: true },
  status: { type: String, required: true }
});

const Testimoni = mongoose.model('Testimoni', testimoniSchema);

export default Testimoni;
