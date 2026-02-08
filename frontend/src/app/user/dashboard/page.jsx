'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Info, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import api from '@/services/api';
import PlaceDetailsModal from '@/components/user/PlaceDetailsModal';

const UserDashboard = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        await api.get('/auth/check-auth');
        setIsAuthorized(true);
        try {
          const { data } = await api.get('/places');
          setPlaces(data);
        } catch (dataError) {
          console.warn("Could not fetch places");
        }
      } catch (authError) {
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    initDashboard();
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      toast.success("Securely logged out");
      router.replace('/login');
    } catch (error) {
      router.push('/login');
    }
  };

  const handleNavigate = (lat, lng) => {
    if (!lat || !lng) {
      toast.error("Coordinates missing");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const filteredPlaces = places.filter(place => 
    place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLogout={handleLogout} />
      <div className="bg-white border-b border-slate-200 py-6 px-4 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Secure Location Search</h1>
          <div className="relative w-full md:w-96 lg:w-[32rem]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by Name, City, or Type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-base transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading secure network...</div>
        ) : filteredPlaces.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
             <MapPin className="mx-auto h-12 w-12 text-slate-300 mb-3" />
             <h3 className="text-lg font-medium text-slate-900">No locations found</h3>
           </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div key={place._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative shrink-0 cursor-pointer" onClick={() => setSelectedPlace(place)}>
                  <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm border border-white/50">
                    {place.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-slate-900 mb-0.5 leading-tight truncate" title={place.title}>
                      {place.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium truncate" title={place.city}>{place.city}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg mb-4 border border-slate-100 h-16">
                    <div className="flex items-start gap-2 h-full overflow-hidden">
                      <Info size={14} className="text-blue-500 mt-1 shrink-0" />
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 break-words" title={place.description}>
                        {place.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-slate-500 text-xs mb-5 mt-auto">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span className="leading-relaxed line-clamp-1" title={place.address}>{place.address}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <button 
                      onClick={() => setSelectedPlace(place)}
                      className="col-span-1 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => handleNavigate(place.latitude, place.longitude)}
                      className="col-span-3 py-2.5 bg-slate-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95 transition-all shadow-md text-sm"
                    >
                      <Navigation size={16} />
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <PlaceDetailsModal isOpen={!!selectedPlace} onClose={() => setSelectedPlace(null)} place={selectedPlace} />
    </div>
  );
};

export default UserDashboard;