'use client';
import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/services/api';
import Modal from '../ui/Modal';
import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('../LocationMap'), { 
  ssr: false, 
  loading: () => <div className="h-48 bg-slate-100 animate-pulse rounded-lg" />
});

const STANDARD_CATEGORIES = ["Healthcare", "ATM / Bank", "Police Station", "Safe Zone"];

const EditPlaceModal = ({ isOpen, onClose, place, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', city: '', address: '', description: '',
    category: '', customCategory: '', 
    latitude: '', longitude: '',
    image: null 
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (place) {
      const isStandard = STANDARD_CATEGORIES.includes(place.category);

      setFormData({
        title: place.title,
        city: place.city,
        address: place.address,
        description: place.description,
        category: isStandard ? place.category : 'Other',
        customCategory: isStandard ? '' : place.category,
        latitude: place.latitude,
        longitude: place.longitude,
        image: null
      });
      setPreview(place.imageUrl);
    }
  }, [place]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && key !== 'category' && key !== 'customCategory') {
            data.append(key, formData[key]);
        }
      });

      const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;
      
      if (formData.category === 'Other' && !finalCategory.trim()) {
        toast.error("Please specify the category");
        setLoading(false);
        return;
      }

      data.append('category', finalCategory);

      if (formData.image) {
        data.append('image', formData.image);
      }

      const { data: updatedPlace } = await api.put(`/places/${place._id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success("Location updated successfully!");
      onUpdate(updatedPlace);
      onClose();
    } catch (error) {
      toast.error("Failed to update location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Location" maxWidth="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Name</label>
              <input name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            
            <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Category</label>
               <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                 <option value="" disabled>Select Category</option>
                 {STANDARD_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                 <option value="Other">Other</option>
               </select>
            </div>

            {formData.category === 'Other' && (
              <div className="animate-fade-in-down">
                <label className="text-xs font-bold text-blue-600 uppercase mb-1 block">Specify Category</label>
                <input 
                  type="text" 
                  name="customCategory" 
                  value={formData.customCategory} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Pharmacy"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">City</label>
              <input name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>

          <div className="space-y-4">
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Address</label>
               <input name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
             </div>
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Description</label>
               <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none" required />
             </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Update Coordinates</label>
          <div className="h-48 rounded-lg overflow-hidden border border-slate-300 relative z-0">
             <LocationMap 
               lat={formData.latitude} 
               lng={formData.longitude} 
               onLocationSelect={(lat, lng) => setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }))}
             />
          </div>
          <div className="flex gap-4 mt-3">
             <input disabled value={formData.latitude} className="w-full text-xs bg-white p-2 rounded border text-slate-500" placeholder="Lat" />
             <input disabled value={formData.longitude} className="w-full text-xs bg-white p-2 rounded border text-slate-500" placeholder="Lng" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="h-14 w-14 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
               {preview && <img src={preview} className="h-full w-full object-cover" alt="Preview" />}
             </div>
             <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors flex-grow md:flex-grow-0 text-center">
               <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
               <Upload size={14} className="inline mr-2"/> Change Image
             </label>
          </div>
          <div className="flex gap-3 w-full md:w-auto md:ml-auto">
             <button type="button" onClick={onClose} className="flex-1 md:flex-none px-4 py-2.5 text-slate-500 hover:bg-slate-100 rounded-lg font-bold text-sm transition-colors">
               Cancel
             </button>
             <button type="submit" disabled={loading} className="flex-1 md:flex-none px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm shadow-lg">
               {loading ? 'Saving...' : <><Save size={16}/> Save Changes</>}
             </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditPlaceModal;