import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, DollarSign, Home, Phone, User as UserIcon } from 'lucide-react';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/rooms/${id}`);
                setRoom(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id]);

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!room) return <div className="text-center py-12">Room not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-96 md:h-auto">
                        <img
                            src={room.images && room.images.length > 0 ? room.images[0] : 'https://via.placeholder.com/800x600?text=No+Image'}
                            alt={room.title}
                            className="w-full h-full object-cover"
                        />
                         {/* Simple carousel could go here for multiple images */}
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{room.propertyType}</div>
                        <h1 className="mt-1 text-3xl font-extrabold text-gray-900">{room.title}</h1>
                        <p className="mt-4 text-gray-500">{room.description}</p>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <div className="flex items-center text-gray-700 mb-2">
                                <MapPin className="w-5 h-5 mr-2" />
                                {room.location}
                            </div>
                            <div className="flex items-center text-gray-700 mb-2">
                                <DollarSign className="w-5 h-5 mr-2" />
                                <span className="text-xl font-bold">{room.price}</span>/month
                            </div>
                            <div className="flex items-center text-gray-700 mb-2">
                                <Home className="w-5 h-5 mr-2" />
                                Preference: {room.tenantPreference}
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-blue-900 mb-2">Owner Details</h3>
                            <div className="flex items-center text-blue-800 mb-1">
                                <UserIcon className="w-4 h-4 mr-2" />
                                {room.owner?.name}
                            </div>
                            <div className="flex items-center text-blue-800">
                                <Phone className="w-4 h-4 mr-2" />
                                {room.contactNumber || room.owner?.phone || 'Contact not available'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
