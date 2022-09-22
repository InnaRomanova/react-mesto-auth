import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    let auth = false;
    // const [auth, setAuth] = useState(false);
    const jwt = localStorage.getItem("jwt");
    // const jwt = null;

    if (jwt === null) {
        auth = false;
    } else {
        auth = true;
    }


        console.log("все здесь не понятно" + localStorage.getItem("jwt"))
    if (!auth) {
        return <Navigate to='/sign-in' state={{ from: location }} />
    }
    return children
}

export default ProtectedRoute;