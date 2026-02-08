'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Activity, Plus, Trash2, Edit, Eye, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import api from '@/services/api';
import toast from 'react-hot-toast';

import Modal from '@/components/ui/Modal'; 
import EditPlaceModal from '@/components/admin/EditPlaceModal';
import ViewPlaceModal from '@/components/admin/ViewPlaceModal';

const Dashboard = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalType, setModalType] = useState(null); 

  const fetchData = async () => {
    try {
      const { data } = await api.get('/places');
      setPlaces(data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (type, place) => {
    setSelectedPlace(place);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setModalType(null);
  };

  const handleUpdate = (updatedPlace) => {
    setPlaces(prev => prev.map(p => p._id === updatedPlace._id ? updatedPlace : p));
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/places/${selectedPlace._id}`);
      setPlaces(prev => prev.filter(p => p._id !== selectedPlace._id));
      toast.success("Location deleted permanently");
      closeModal();
    } catch (error) {
      toast.error("Failed to delete location");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Manage your secure network.</p>
        </div>
        <Link href="/admin/add-place">
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg text-sm">
            <Plus size={18} /> Add Location
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase hidden md:table-cell">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {places.map((place) => (
                <tr key={place._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                         <img src={place.imageUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 max-w-[60px] md:max-w-[200px] truncate">
                          {place.title}
                        </div>
                        <div className="text-xs text-slate-500 max-w-[60px] md:hidden">{place.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                      {place.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                       <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                       <span className="text-sm font-medium text-slate-600">Live</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => openModal('view', place)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => openModal('edit', place)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => openModal('delete', place)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewPlaceModal isOpen={modalType === 'view'} onClose={closeModal} place={selectedPlace} />
      <EditPlaceModal isOpen={modalType === 'edit'} onClose={closeModal} place={selectedPlace} onUpdate={handleUpdate} />

      <Modal isOpen={modalType === 'delete'} onClose={closeModal} title="Confirm Deletion" maxWidth="max-w-md">
         <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete this location?</h3>
            <p className="text-slate-500 mb-6 text-sm overflow-hidden">
              Are you sure you want to delete <span className="font-bold text-slate-800">"{selectedPlace?.title}"</span>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={closeModal} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 transition-colors">
                Yes, Delete
              </button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default Dashboard;