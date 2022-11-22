import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";

const customers = [
    {
        num: 1,
        id: 1000001,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 2,
        id: 1000002,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 3,
        id: 1000003,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 4,
        id: 1000004,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 5,
        id: 1000005,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 6,
        id: 1000006,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 20,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
];

function Customers() {
    return (
        <div>
            <div className="flex space-x-4">
                {/* tite + reload btn */}
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">
                        Danh sách khách hàng
                    </label>
                    <button
                        type="button"
                        className="ml-3 text-gray-800 hover:underline"
                    >
                        <span className="font-sm pr-1">
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        <span className="">Tải lại</span>
                    </button>
                </div>

                {/* Action group */}
                <div className="flex grow">
                    {/* Search */}
                    <div className="mr-2 flex grow">
                        <input
                            type="text"
                            className="text-input grow"
                            placeholder="Tìm kiếm khách hàng"
                        />

                        <button className="btn btn-md bg-slate-200 !px-3 text-slate-600 hover:bg-slate-300">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>

                    <button className="btn btn-md bg-slate-200 !px-3 text-slate-600 hover:bg-slate-300">
                        <i className="fas fa-filter"></i>
                    </button>

                    <Link
                        to="/"
                        className="btn btn-md bg-green-600 hover:bg-green-500"
                    >
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm khách hàng</span>
                    </Link>
                </div>
            </div>
            <table className="mt-4 w-full">
                <colgroup>
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "10%" }} />
                </colgroup>

                <thead className="h-11 rounded bg-blue-500 text-white">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã KH</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ </th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customers) => (
                        <tr
                            key={customers.id}
                            className="cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                        >
                            <td className="py-2 text-center">
                                {customers.num}
                            </td>
                            <td className="py-2 text-center">{customers.id}</td>
                            <td className="py-2 text-center">
                                {customers.name}
                            </td>
                            <td className="py-2 text-center">
                                {customers.phone}
                            </td>
                            <td className="py-2 text-center">
                                {customers.address}
                            </td>
                            <td className="py-2 text-center">
                                <div className="flex justify-end">
                                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-400">
                                        <span className="pr-1">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span>Sửa</span>
                                    </button>
                                    <button className="btn btn-sm bg-red-500 hover:bg-red-400">
                                        <span className="pr-1">
                                            <i className="fa-solid fa-circle-xmark"></i>
                                        </span>
                                        <span>Xoá</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Customers;
