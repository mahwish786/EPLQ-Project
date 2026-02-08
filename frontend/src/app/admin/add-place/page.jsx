'use client';
import React, { useState } from 'react';
import { MapPin, Save, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { uploadFile } from '@/services/api';
import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('@/components/LocationMap'), { 
  ssr: false, 
  loading: () => <div className="h-64 bg-slate-100 rounded-xl animate-pulse" />
});

const AddPlace = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '', city: '', address: '', description: '',
    category: '', customCategory: '',      
    latitude: '', longitude: '', image: null
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleMapClick = (lat, lng) => setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();  
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('city', formData.city);
      data.append('address', formData.address);
      data.append('description', formData.description);
      
      const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;
      if (formData.category === 'Other' && !finalCategory.trim()) {
         toast.error("Please specify the category");
         setLoading(false);
         return;
      }
      if (!formData.image) {
        toast.error("Please upload an image first!"); 
        return;
      }
      data.append('category', finalCategory);
      data.append('latitude', formData.latitude);
      data.append('longitude', formData.longitude);
      data.append('image', formData.image);

      await uploadFile('/places', data);
      toast.success('Location added successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Add Location</h1>
        <p className="text-sm text-slate-500">Add a new secure point to the network.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6 h-full">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <div className="relative">
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-base transition-all appearance-none cursor-pointer" required>
                  <option value="" disabled>Select Category</option>
                  <option>Healthcare</option>
                  <option>ATM / Bank</option>
                  <option>Police Station</option>
                  <option>Safe Zone</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
              </div>
            </div>
            {formData.category === 'Other' && (
              <div className="animate-fade-in-down">
                <label className="block text-sm font-bold text-blue-700 mb-2">Specify Category</label>
                <input type="text" name="customCategory" value={formData.customCategory} onChange={handleChange} className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-base" placeholder="e.g. Pharmacy" />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Place Name</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-base transition-all" placeholder="e.g. City General Hospital" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-base transition-all" placeholder="e.g. New Delhi" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-base transition-all" placeholder="Street, Sector, Landmark..." />
            </div>
            <div className="flex-grow flex flex-col">
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base transition-all min-h-[120px]" placeholder="Details about facilities, hours, or services..." />
            </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative z-0">
            <div className="flex justify-between items-center mb-4">
               <h2 className="font-bold text-base text-slate-800 flex items-center gap-2"><MapPin size={18} className="text-red-500"/> Location</h2>
               <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Click map to set</span>
            </div>
            <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200 relative z-0 mb-4"> 
               <LocationMap lat={formData.latitude} lng={formData.longitude} onLocationSelect={handleMapClick} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Latitude</label>
                <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg bg-slate-50 border-slate-200 text-sm font-mono focus:bg-white outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Longitude</label>
                <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg bg-slate-50 border-slate-200 text-sm font-mono focus:bg-white outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="0.00" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-grow flex flex-col justify-between">
             <div>
                <h2 className="font-bold text-base text-slate-800 mb-4 flex items-center gap-2">
                    <ImageIcon size={18} className="text-purple-600"/> Image
                </h2>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-24 w-28 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      {preview ? <img src={preview} className="h-full w-full object-cover" alt="Preview" /> : <div className="h-full w-full flex items-center justify-center text-slate-300"><ImageIcon size={28}/></div>}
                    </div>
                    <div className="flex-grow">
                      <label className="w-full cursor-pointer bg-slate-50 border-2 border-dashed border-slate-300 hover:bg-blue-50 hover:border-blue-300 text-slate-500 hover:text-blue-600 py-3 rounded-xl text-sm font-bold block text-center transition-all">
                          <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" />
                          {preview ? "Change Image" : "Click to Upload"}
                      </label>
                    </div>
                </div>
             </div>
            <button type="submit" disabled={loading} className={`w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-base ${loading ? "hover:bg-blue-700" : "hover:bg-blue-600"} transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-95`}>
              {loading ? "Saving Location..." : <><Save size={20} /> Save Location</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;