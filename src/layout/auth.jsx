import React from "react";
import { Outlet } from "react-router";

function Auth() {
    return (
        <div>
            <div
                className="min-h-screen bg-cover bg-no-repeat "
                style={{
                    backgroundImage:
                        "url('https://firebasestorage.googleapis.com/v0/b/react-project-f1a10.appspot.com/o/image%2F6c577428-a968-4e31-9b45-bb9d739acb0f%20(1).png?alt=media&token=3c375a38-eefa-420f-9775-38c8632faf45')",
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default Auth;
