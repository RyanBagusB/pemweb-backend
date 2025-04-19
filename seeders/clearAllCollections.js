import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Terhubung ke MongoDB");

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (let collection of collections) {
      console.log(`Menghapus koleksi: ${collection.name}`);
      await mongoose.connection.db.dropCollection(collection.name);
    }

    console.log("Semua koleksi berhasil dihapus");
    process.exit();
  })
  .catch(err => {
    console.error("Gagal terhubung:", err);
    process.exit(1);
  });
