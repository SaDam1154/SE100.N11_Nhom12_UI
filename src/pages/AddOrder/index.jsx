import { useEffect, useState } from 'react';

function AddOrder() {
    const [div, setDiv] = useState('');
    const [divs, setDivs] = useState([{ div }]);
    function handleAddDiv() {
        setDivs((divs) => [...divs, div]);
    }
    return (
        <div className="container">
            <div className="flex  border-4 border-solid py-4 text-lg">
                <div className="flex basis-1/4 flex-col">
                    <label className="mb-1 font-semibold" htmlFor="name">
                        Số điện thoại{' '}
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="text-input mr-8 py-[5px]"
                        required
                    />
                </div>

                <div className="flex basis-1/4 flex-col">
                    <label className="mb-1 font-semibold" htmlFor="type">
                        Tên khách hàng
                    </label>
                    <input
                        type="text"
                        className="text-input mr-8 py-[5px]"
                        id="type"
                    />
                </div>
                <div className="flex basis-1/2 flex-col">
                    <label className="mb-1 font-semibold" htmlFor="type">
                        Địa chỉ
                    </label>
                    <input
                        type="text"
                        className="text-input mr-8 py-[5px]"
                        id="type"
                    />
                </div>
            </div>
            <div className="flex">
                <div className="mt-1  flex basis-1/2 flex-col border-4 border-solid py-4 text-lg">
                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="name">
                            Tên cây
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="text-input mr-8 py-[5px]"
                            required
                        />
                    </div>

                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="type">
                            Số lượng
                        </label>
                        <input
                            type="text"
                            className="text-input mr-8 py-[5px]"
                            id="type"
                        />
                    </div>
                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="type">
                            Giá
                        </label>
                        <input
                            type="text"
                            className="text-input mr-8 py-[5px]"
                            id="type"
                        />
                    </div>
                    <div className="  mt-1 flex justify-center py-4 px-4 text-center text-lg">
                        <button className="btn btn-blue btn-md ">
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Thêm</span>
                        </button>
                    </div>
                </div>
                <div className="mt-1 flex basis-1/2 flex-col  text-center align-middle">
                    <ul>
                        <li>Cây Sen đá màu xanh</li>
                        <li>Cây xương rồng xanh</li>
                    </ul>
                </div>
            </div>

            <div className="ml-4px float-right mt-8 flex w-1/2 flex-row pl-4">
                <div className="mr-[3%] flex basis-1/2 flex-col pl-[5%]">
                    <button className="btn btn-red btn-md w-full">
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span>Hủy</span>
                    </button>
                </div>
                <div className="ml-[3%] flex basis-1/2 flex-col pr-[5%]">
                    <button className="btn btn-blue btn-md w-full">
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
//
//
export default AddOrder;
