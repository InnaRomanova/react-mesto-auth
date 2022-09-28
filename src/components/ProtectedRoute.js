import { useLocation, Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    let auth = false;
    const jwt = localStorage.getItem("jwt");

    if (jwt === null) {
        auth = false;
    } else {
        auth = true;
    }

    if (!auth) {
        return <Navigate to='/sign-in' 
        state={{ from: location }} 
        />
    }
    return children
}

export default ProtectedRoute;