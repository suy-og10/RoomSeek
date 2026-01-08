import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Home } from 'lucide-react';

const RoomCard = ({ room }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                src={room.images && room.images.length > 0 ? room.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={room.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{room.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{room.propertyType}</span>
                </div>
                <div className="mt-2 flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {room.location}
                </div>
                <div className="mt-2 flex items-center text-gray-900 font-bold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {room.price}/month
                </div>
                <div className="mt-2 flex items-center text-gray-500 text-sm">
                    <Home className="w-4 h-4 mr-1" />
                    {room.tenantPreference}
                </div>
                <Link
                    to={`/rooms/${room._id}`}
                    className="mt-4 block w-full text-center bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;
