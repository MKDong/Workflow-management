import React from "react";
import { Link } from "react-router-dom";

function footer() {
    return (
        <div>
            <div className="footer w-full bg-gray-300 text-black">
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3 mx-20">
                    <div className="h-48 mt-8 mx-5 text-left lg:w-full md:w-full sm:w-full">
                        <h1 className="font-bold text-2xl">Address</h1>
                        <hr />
                        <div className="my-2">
                            Address:{" "}
                            <Link className="hover:underline" href="#">
                                Viet Nam
                            </Link>
                        </div>
                        <div className="my-2">
                            Email:{" "}
                            <Link className="hover:underline" href="#">
                                dongmk@gmail.com
                            </Link>
                        </div>
                        <div className="my-2">
                            Phone:{" "}
                            <Link className="hover:underline" href="#">
                                0971616598
                            </Link>
                        </div>
                    </div>
                    <div className="h-48 mt-8 mx-5 lg:w-full ">
                        <h1 className="font-bold text-2xl xl:text-left lg:text-left sm:text-right md:text-right">
                            Link
                        </h1>
                        <hr />
                        <div className="my-2 flex xl:justify-start lg:justify-start sm:justify-end md:justify-end">
                            <Link href="">
                                <img
                                    className="w-11 h-10 mr-2"
                                    src="https://res.cloudinary.com/thisisninh/image/upload/v1668088609/fb__u8rwjt.png"
                                    alt=""
                                />
                            </Link>
                            <img
                                className="w-10 h-10 mx-2"
                                src="https://res.cloudinary.com/thisisninh/image/upload/v1668088637/zalo__rbqljr.png"
                                alt=""
                            />
                            <img
                                className="w-10 h-10 mx-2"
                                src="https://res.cloudinary.com/thisisninh/image/upload/v1668088684/instar_k5ddik.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="h-48 mt-8 mx-5 text-left lg:w-full ">
                        <h1 className="font-bold text-2xl">Link</h1>
                        <hr />
                        <div className="my-2">
                            <Link className="hover:underline" href="#">
                                Introduce
                            </Link>
                        </div>
                        <div className="my-2">
                            <Link className="hover:underline " href="test.html">
                                Test
                            </Link>
                        </div>
                    </div>
                </div>
                <hr className="mx-20" />
                <p className="text-center">Copyright © 2023 All Rights Reserveds</p>
            </div>
        </div>
    );
}

export default footer;
