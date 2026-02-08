import Place from '../models/Place.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "eplq_places" },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
};

export const addPlace = async (req, res) => {
  try {
    const { title, city, address, description, category, latitude, longitude } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    console.log("Starting Upload..."); 

    const result = await uploadFromBuffer(req.file.buffer);
    console.log("Upload Success:", result.secure_url);

    const place = await Place.create({
      title,
      city,
      address,
      description,
      category,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      imageUrl: result.secure_url,
      imageId: result.public_id,
      encryptedLocationIndex: "enc_" + Date.now() 
    });

    res.status(201).json(place);

  } catch (error) {
    console.error("Add Place Error:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Location not found' });
    
    await Place.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const { title, city, address, description, category, latitude, longitude } = req.body;
    
    let place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });

    const updatedData = {
      title, city, address, description, category, latitude, longitude
    };

    if (req.file) {
      console.log("Updating image...");
      const result = await uploadFromBuffer(req.file.buffer);
      updatedData.imageUrl = result.secure_url;
      updatedData.imageId = result.public_id;
    }

    place = await Place.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    
    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update failed' });
  }
};