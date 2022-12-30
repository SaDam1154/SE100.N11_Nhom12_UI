import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';

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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingRoleId, setDeletingRoleId] = useState(null);
    const showDeleteNoti = () => toast.info('Xóa chức vụ thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState(' ');
    const [renderRoles, setRenderRoles] = useState([]);
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

    useEffect(() => {
        setRenderRoles(
            roles?.filter((role) => {
                if (search === '') {
                    return role;
                } else {
                    if (
                        removeVietnameseTones(role.name.toLowerCase()).includes(
                            removeVietnameseTones(search.toLowerCase())
                        ) ||
                        removeVietnameseTones(role?.id.toString().toLowerCase()).includes(
                            removeVietnameseTones(search.toLowerCase())
                        )
                    ) {
                        var id = role.id.toString();
                        return role.id.toString().includes(id);
                    }
                }
            })
        );
    }, [search]);
    function LinkToDetail(id) {
        navigate('/roles/detail/' + id);
    }

    function deleteRole(id) {
        fetch('http://localhost:5000/api/role/' + id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                setShowDeleteDialog(false);
                if (resJson) {
                    showDeleteNoti();
                    console.log('xóa');
                    getRoles();
                } else {
                    showErorrNoti();
                }
            })
            .catch(() => {
                showErorrNoti();
                setShowDeleteDialog(false);
            });
    }

    return (
        <>
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
                            <tr
                                key={role.id}
                                className="cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                onClick={() => linkToDetail(role.id)}
                            >
                                <td className="py-2 text-center">{role.id}</td>
                                <td className="py-2 text-left">{role.name}</td>
                                <td className="py-2 text-left">{role.description}</td>
                                <td className="py-2 text-center">
                                    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                                        <Link
                                            to={'/role/update/' + role.id}
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-400"
                                        >
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </Link>
                                        <button
                                            className="btn btn-sm bg-red-500 hover:bg-red-400"
                                            onClick={() => {
                                                {
                                                    setShowDeleteDialog(true);
                                                    setDeletingRoleId(role.id);
                                                }
                                            }}
                                        >
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

            {/* DELETE DIALOG */}
            <div
                className={clsx(
                    'fixed inset-0 z-[99999] hidden items-center justify-center bg-black/20 opacity-0 transition-opacity',
                    {
                        '!flex !opacity-100': showDeleteDialog,
                    }
                )}
            >
                <div className="">
                    <div className="min-w-[160px] max-w-[400px] rounded-lg bg-white p-6">
                        <div className="text-clr-text-dark font-bold">Bạn có chắc chắn muốn xoá không?</div>
                        <p className="mt-4">Lưu ý: Bạn không thể không phục lại sau khi xoá!</p>
                        <div className="mt-4 flex">
                            <button
                                className="btn btn-blue btn-md"
                                onClick={() => {
                                    setDeletingRoleId(null);
                                    setShowDeleteDialog(false);
                                }}
                            >
                                Quay lại
                            </button>
                            <button className="btn btn-md btn-red" onClick={() => deleteRole(deletingRoleId)}>
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Roles;
