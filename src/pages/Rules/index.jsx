import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";

const rules = [
    {
        num: 1,
        id: "AD",
        name: "Quản trị viên",
    },
    {
        num: 2,
        id: "CH",
        name: "Chủ cửa hàng",
    },
    {
        num: 3,
        id: "NV",
        name: "Nhân viên",
    },
];

function Rules() {
    return (
        <div>
            <div className="flex space-x-4">
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">
                        Danh sách phân quyền
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

                <div className="flex grow">
                    <div className="mr-2 flex grow">
                        <input
                            type="text"
                            className="text-input grow"
                            placeholder="Tìm kiếm chức vụ"
                        />

                        <button className="btn btn-md bg-slate-200 !px-3 text-slate-600 hover:bg-slate-300">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>

                    <button className="btn btn-md bg-slate-200 !px-3 text-slate-600 hover:bg-slate-300">
                        <i className="fas fa-filter"></i>
                    </button>

                    <Link
                        to="/rules/addrule"
                        className="btn btn-md bg-green-600 hover:bg-green-500"
                    >
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm chức vụ</span>
                    </Link>
                </div>
            </div>
            <table className="mt-4 w-full">
                <colgroup>
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "30%" }} />
                    <col span="1" style={{ width: "10%" }} />
                </colgroup>

                <thead className="h-11 rounded bg-blue-500 text-white">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">ID</th>
                        <th scope="col">Tên chức vụ</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {rules.map((rule) => (
                        <tr
                            key={rule.id}
                            className="cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                        >
                            <td className="py-2 text-center">{rule.num}</td>
                            <td className="py-2 text-center">{rule.id}</td>
                            <td className="py-2 text-center">{rule.name}</td>
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

export default Rules;
