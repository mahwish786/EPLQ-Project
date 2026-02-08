'use client';
import React from 'react';
import Modal from '../ui/Modal';
import { MapPin, Calendar, Tag } from 'lucide-react';

const ViewPlaceModal = ({ isOpen, onClose, place }) => {
  if (!place) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Location Details">
      <div className="space-y-6">
        <div className="h-56 w-full rounded-xl overflow-hidden shadow-sm">
          <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1">
              <Tag size={12} /> {place.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar size={12} /> Added: {new Date(place.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 truncate pr-2" title={place.title}>{place.title}</h2>
          <p className="text-slate-500 font-medium truncate" title={place.city}>{place.city}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Description</h4>
            <p className="text-slate-700 text-sm leading-relaxed wrap-break-word" title={place.description}>{place.description}</p>
          </div>
          <div className="pt-3 border-t border-slate-200">
             <h4 className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
               <MapPin size={12}/> Address
             </h4>
             <p className="text-slate-700 text-sm line-clamp-6 wrap-break-word" title={place.address}>{place.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-2 rounded border border-slate-200 text-center min-w-0">
               <span className="block text-[10px] text-slate-400 uppercase">Latitude</span>
               <span className="font-mono text-xs font-bold text-slate-700 block truncate" title={place.latitude}>
                 {place.latitude}
               </span>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 text-center min-w-0">
               <span className="block text-[10px] text-slate-400 uppercase">Longitude</span>
               <span className="font-mono text-xs font-bold text-slate-700 block truncate" title={place.longitude}>
                 {place.longitude}
               </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewPlaceModal;