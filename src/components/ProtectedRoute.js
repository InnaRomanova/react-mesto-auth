import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({component: Component, ...props}) {
return(
    <Route>
        {() => (props.loginIn ? <Component {...props} /> : <Navigate to="./sign-in" />)}
    </Route>
)
}
export default ProtectedRoute;