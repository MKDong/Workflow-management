import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter() {
    const token = localStorage.getItem("token");
    return token ? "" : <Navigate to={"/"} />;
}

export default PrivateRouter;
