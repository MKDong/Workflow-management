import React from "react";
import { Outlet } from "react-router";
import Header from "../component/usser/header";
import Footer from "../component/usser/footer";
// import Export from "../component/usser/HOC/Excel/Export";

function Home() {
    return (
        <div>
            <div className="mb-8">
                <Header />
            </div>
            <div className="mx-12">
                <Outlet />
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
