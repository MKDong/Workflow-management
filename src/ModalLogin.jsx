import React from "react";

function ModalLogin() {
    return (
        <div className="w-full flex">
            <div className="w-28 h-80 justify-center mt-64">
                <form>
                    <label htmlFor="">Email:</label>
                    <input type="text" placeholder="Nhap email" />
                    <label htmlFor="">Password:</label>
                    <input type="text" placeholder="Nhap Password" />
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;
