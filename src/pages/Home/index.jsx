import { useEffect, useState } from 'react';

function Home() {
    return (
        <div className="container flex h-full w-full items-center justify-center space-x-11">
            <div className=" text-gray-600">
                <p className="text-4xl font-extrabold">QUẢN LÝ</p>
                <p className="text-3xl font-bold">CỬA HÀNG CÂY CẢNH</p>
            </div>
            <img className="w-[40vw] " src="/home-img.jpg" />
        </div>
    );
}

export default Home;
