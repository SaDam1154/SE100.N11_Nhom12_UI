import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import { useEffect, useState } from 'react';

function Roles() {
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        getRoles();
    }, []);

    function getRoles() {
        fetch('http://localhost:5000/api/role')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setRoles(resJson.roles);
                } else {
                    setRoles([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setRoles([]);
            });
    }

    return (
        <div>
            <div className="flex space-x-4">
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">Danh sách chức vụ</label>
                    <button type="button" className="ml-3 text-gray-800 hover:underline">
                        <span className="font-sm pr-1">
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        <span className="" onClick={() => getRoles()}>
                            Tải lại
                        </span>
                    </button>
                </div>

                <div className="flex grow justify-between">
                    <div></div>
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
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '40%' }} />
                    <col span="1" style={{ width: '10%' }} />
                </colgroup>

                <thead className="h-11 rounded bg-blue-500 text-white">
                    <tr>
                        <th scope="col" className="text-center">
                            Mã chức vụ
                        </th>
                        <th scope="col" className="text-left">
                            Tên chức vụ
                        </th>
                        <th scope="col" className="text-left">
                            Chú thích
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id} className="cursor-pointer border-b border-slate-200 hover:bg-slate-100">
                            <td className="py-2 text-center">{role.id}</td>
                            <td className="py-2 text-left">{role.name}</td>
                            <td className="py-2 text-left">{role.description}</td>
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

export default Roles;
