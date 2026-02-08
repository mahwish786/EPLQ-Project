import express from 'express';
import multer from 'multer';
import { addPlace, deletePlace, getPlaces, updatePlace } from '../controllers/placeController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/', protectAdmin, upload.single('image'), addPlace);
router.get('/', getPlaces);

router.delete('/:id', protectAdmin, deletePlace);
router.put('/:id', protectAdmin, upload.single('image'), updatePlace);

export default router;