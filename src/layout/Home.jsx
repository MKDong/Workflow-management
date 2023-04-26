import React from "react";
import { Outlet } from "react-router";
import Header from "../component/usser/header";
import Footer from "../component/usser/footer";
// import ModalLogin from "../ModalLogin";

function Home() {
    return (
        <div>
            <div className="mb-8">
                <Header />
            </div>
            <div className="mx-12 mt-24">
                <Outlet />
                {/* <ModalLogin /> */}
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
