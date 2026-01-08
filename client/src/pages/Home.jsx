import { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import { Search } from 'lucide-react';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        maxPrice: '',
        type: '',
        tenant: '',
    });

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.location) params.append('location', filters.location);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.type) params.append('type', filters.type);
            if (filters.tenant) params.append('tenant', filters.tenant);

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/rooms?${params.toString()}`);
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRooms();
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="location"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Where do you want to live?"
                                value={filters.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Price</label>
                        <input
                            type="number"
                            name="maxPrice"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="All"
                            value={filters.maxPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={filters.type}
                            onChange={handleChange}
                        >
                            <option value="">Any</option>
                            <option value="1BHK">1 BHK</option>
                            <option value="2BHK">2 BHK</option>
                            <option value="3BHK">3 BHK</option>
                            <option value="Room">Single Room</option>
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700">Preference</label>
                         <select
                            name="tenant"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={filters.tenant}
                            onChange={handleChange}
                        >
                            <option value="">Any</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Family">Family</option>
                            <option value="Girls">Girls</option>
                            <option value="Working">Working</option>
                        </select>
                    </div>
                    <div className="md:col-span-5 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <RoomCard key={room._id} room={room} />
                    ))}
                    {rooms.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No rooms found matching your criteria.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
