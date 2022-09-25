<<<<<<< HEAD
import React from "react";
import { Navigate, Route, useParams } from "react-router-dom";

function ProtectedRoute({component: Component, ...props}) {
    // const params = useParams();
return(
    <Route>
        {() => (props.loginIn ? <Component {...props} /> : <Navigate to="./sign-in" />)}
        {/* params={params} */}
    </Route>
)
}
=======
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

>>>>>>> dev
export default ProtectedRoute;