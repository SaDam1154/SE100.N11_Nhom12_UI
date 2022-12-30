import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import { useEffect, useState } from 'react';

function removeVietnameseTones(stra) {
    var str = stra;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    return str;
}

function Roles() {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [renderProduct, setRenderProduct] = useState([]);
    useEffect(() => {
        getRoles();
        console.log(roles);
    }, []);

    function getRoles() {
        fetch('http://localhost:5000/api/role')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setRoles(resJson.roles);
                    console.log(roles[0]);
                } else {
                    setRoles([]);
                }
            });
    }

    useEffect(() => {
        setRenderProduct(
            roles.filter((role) => {
                if (search === '') {
                    return role;
                } else {
                    if (
                        removeVietnameseTones(role.name.toLowerCase()).includes(
                            removeVietnameseTones(search.toLowerCase())
                        )
                    ) {
                        var id = role.id.toString();
                        if (
                            removeVietnameseTones(role.name.toLowerCase()).includes(
                                removeVietnameseTones(search.toLowerCase())
                            )
                        ) {
                            console.log(
                                removeVietnameseTones(role.name.toLowerCase()) +
                                    '=' +
                                    removeVietnameseTones(search.toLowerCase()) +
                                    '=' +
                                    id
                            );
                        }
                        return role.id.toString().includes(id);
                    }
                }
            })
            // .filter((role) => {
            //     if (!search) {
            //         return true;
            //     }
            //     return role.id.toString() = search;
            // })
        );
    }, [search]);

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
                        <th scope="col">Mã chức vụ</th>
                        <th scope="col">Tên chức vụ</th>
                        <th scope="col">Chú thích</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {roles
                        .filter((role) => {
                            return search.toLowerCase() === '' ? role : role.name.toLowerCase().includes(search);
                        })
                        .map((role) => (
                            <tr key={role.id} className="cursor-pointer border-b border-slate-200 hover:bg-slate-100">
                                <td className="py-2 text-center">{role.id}</td>
                                <td className="py-2 text-center">{role.name}</td>
                                <td className="py-2 text-center">{role.description}</td>
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
