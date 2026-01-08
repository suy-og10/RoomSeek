import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const AddRoom = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        propertyType: '1BHK',
        tenantPreference: 'Any',
        contactNumber: '',
    });
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(`${import.meta.env.VITE_API_URL}/api/rooms`, data, config);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Failed to create room');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">List a New Room</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Room Title</label>
                    <input type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.title} onChange={handleChange} />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select name="propertyType" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" value={formData.propertyType} onChange={handleChange}>
                        <option value="1BHK">1 BHK</option>
                        <option value="2BHK">2 BHK</option>
                        <option value="3BHK">3 BHK</option>
                        <option value="Room">Single Room</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.location} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Rent (₹/Month)</label>
                        <input type="number" name="price" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.price} onChange={handleChange} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input type="text" name="contactNumber" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tenant Preference</label>
                    <select name="tenantPreference" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" value={formData.tenantPreference} onChange={handleChange}>
                        <option value="Any">Any</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Family">Family</option>
                        <option value="Girls">Girls</option>
                        <option value="Working">Working</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <div>
                    <button type="submit" disabled={uploading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {uploading ? 'Creating...' : 'List Room'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;
