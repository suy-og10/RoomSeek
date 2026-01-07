import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, ownerOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (ownerOnly && user.role !== 'owner') {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
