import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  
  imageUrl: { type: String, required: true },
  imageId: { type: String },
  
  encryptedLocationIndex: { type: String }, 

  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Place', PlaceSchema);