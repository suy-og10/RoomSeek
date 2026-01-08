import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Trash2, Plus } from 'lucide-react';

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMyRooms = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/rooms/myrooms`, config);
                setRooms(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (user) {
            fetchMyRooms();
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/rooms/${id}`, config);
                setRooms(rooms.filter((room) => room._id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete room');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
                <Link
                    to="/add-room"
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Add New Room
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {rooms.map((room) => (
                        <li key={room._id}>
                            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={room.images && room.images.length > 0 ? room.images[0] : 'https://via.placeholder.com/100'}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-blue-600 truncate">{room.title}</div>
                                        <div className="text-sm text-gray-500">{room.location}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-sm text-gray-900 font-bold mr-6">₹{room.price}</div>
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {rooms.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                            You haven't listed any rooms yet.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
