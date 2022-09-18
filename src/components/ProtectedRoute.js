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
export default ProtectedRoute;