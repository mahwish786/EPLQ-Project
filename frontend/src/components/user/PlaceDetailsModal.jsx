'use client';
import React from 'react';
import Modal from '../ui/Modal';
import { MapPin, Navigation, Tag, Info } from 'lucide-react';

const PlaceDetailsModal = ({ isOpen, onClose, place }) => {
  if (!place) return null;

  const handleNavigate = () => {
    if (!place.latitude || !place.longitude) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Secure Location Details">
      <div className="space-y-6">
        <div className="h-52 w-full rounded-2xl overflow-hidden shadow-sm relative">
          <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm border border-white/50">
            {place.category}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-1 truncate" title={place.title}>{place.title}</h2>
          <p className="text-slate-500 font-medium text-sm truncate" title={place.city}>{place.city}</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-5">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
               <Info size={12}/> Description
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line wrap-break-word" title={place.description}>
              {place.description}
            </p>
          </div>
          <div className="border-t border-slate-200 pt-4"></div>
          <div>
             <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
               <MapPin size={12}/> Full Address
             </h4>
             <p className="text-slate-700 text-sm leading-relaxed wrap-break-word" title={place.address}>
               {place.address}
             </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center min-w-0">
               <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Latitude</span>
               <span className="font-mono text-xs font-bold text-slate-700 block truncate" title={place.latitude}>
                 {place.latitude}
               </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center min-w-0">
               <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Longitude</span>
               <span className="font-mono text-xs font-bold text-slate-700 block truncate" title={place.longitude}>
                 {place.longitude}
               </span>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <button 
            onClick={handleNavigate}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <Navigation size={20} />
            Navigate Now
          </button>
          <button 
            onClick={onClose}
            className="w-full mt-3 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PlaceDetailsModal;