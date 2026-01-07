import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogOut, Home, PlusCircle, Search } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
                            <Home className="w-6 h-6 mr-2" />
                            Room Finder
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
                            Find Rooms
                        </Link>
                        {user ? (
                            <>
                                {user.role === 'owner' && (
                                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
                                        Dashboard
                                    </Link>
                                )}
                                <span className="text-gray-500 text-sm">Hello, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-gray-700 hover:text-red-500 px-3 py-2 rounded-md font-medium"
                                >
                                    <LogOut className="w-5 h-5 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
