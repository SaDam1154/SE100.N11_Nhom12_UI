import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import { useState } from 'react';

const roles = [
    {
        num: 1,
        id: 'AD',
        name: 'Quản trị viên',
        function: [
            {
                _id: 1,
                name: 'product/read',
                displayName: 'Xem sản phẩm',
                index: '101',
            },
            {
                _id: 2,
                name: 'product/add',
                displayName: 'Thêm sản phẩm',
                index: '102',
            },
            {
                _id: 1,
                name: 'product/update',
                displayName: 'Sửa sản phẩm',
                index: '103',
            },
        ],
    },
    {
        num: 2,
        id: 'CH',
        name: 'Chủ cửa hàng',
        function: [
            {
                _id: 1,
                name: 'product/read',
                displayName: 'Xem sản phẩm',
                index: '101',
            },
            {
                _id: 2,
                name: 'product/add',
                displayName: 'Thêm sản phẩm',
                index: '102',
            },
            {
                _id: 3,
                name: 'product/update',
                displayName: 'Sửa sản phẩm',
                index: '103',
            },
        ],
    },
    {
        num: 3,
        id: 'NV',
        name: 'Nhân viên',
        function: [
            {
                _id: 1,
                name: 'product/read',
                displayName: 'Xem sản phẩm',
                index: '101',
            },
        ],
    },
];

function Role() {
    const [search, setSearch] = useState('');

    return (
        <div>
            <div className="flex space-x-4">
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">Danh sách phân quyền</label>
                    <button type="button" className="ml-3 text-gray-800 hover:underline">
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
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
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

                    <Link to="/role/add" className="btn btn-md bg-green-600 hover:bg-green-500">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm chức vụ</span>
                    </Link>
                </div>
            </div>
            <table className="mt-4 w-full">
                <colgroup>
                    <col span="1" style={{ width: '10%' }} />
                    <col span="1" style={{ width: '10%' }} />
                    <col span="1" style={{ width: '30%' }} />
                    <col span="1" style={{ width: '10%' }} />
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
                    {roles
                        .filter((role) => {
                            return search.toLowerCase() === ''
                                ? role
                                : role.name.toLowerCase().includes(search) || role.id.toLowerCase().includes(search);
                        })
                        .map((role) => (
                            <tr key={role.id} className="cursor-pointer border-b border-slate-200 hover:bg-slate-100">
                                <td className="py-2 text-center">{role.num}</td>
                                <td className="py-2 text-center">{role.id}</td>
                                <td className="py-2 text-center">{role.name}</td>
                                <td className="py-2 text-center">
                                    <div className="flex justify-end">
                                        <Link to="/role/update" className="btn btn-sm bg-blue-500 hover:bg-blue-400">
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </Link>
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

export default Role;
