import clsx from 'clsx';
import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Accounts() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingAccountId, setDeletingAccountId] = useState(null);

    const [search, setSearch] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [renderAccounts, setRenderAccounts] = useState([]);
    const navigate = useNavigate();

    const showDeleteNoti = () => toast.info('Xóa tài khoản thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    useEffect(() => {
        getAccounts();
    }, []);

    function getAccounts() {
        fetch('http://localhost:5000/api/account')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setAccounts(resJson.accounts);
                    setRenderAccounts(resJson.accounts);
                } else {
                    setRenderAccounts([]);
                    setAccounts([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setAccounts([]);
                setRenderAccounts([]);
            });
    }

    useEffect(() => {
        setRenderAccounts(
            accounts?.filter((account) => {
                if (search === '') {
                    return account;
                } else {
                    if (
                        removeVietnameseTones(account.name.toLowerCase()).includes(
                            removeVietnameseTones(search.toLowerCase())
                        ) ||
                        removeVietnameseTones(account?.phone.toString().toLowerCase()).includes(
                            removeVietnameseTones(search.toLowerCase())
                        )
                    ) {
                        var id = account.id.toString();
                        return account.id.toString().includes(id);
                    }
                }
            })
        );
    }, [search]);

    function deleteAccount(id) {
        fetch('http://localhost:5000/api/account/' + id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                setShowDeleteDialog(false);
                if (resJson) {
                    showDeleteNoti();
                    getAccounts();
                } else {
                    showErorrNoti();
                }
            })
            .catch(() => {
                showErorrNoti();
                setShowDeleteDialog(false);
            });
    }

    function LinkToDetail(id) {
        navigate('/account/detail/' + id);
    }
    return (
        <>
            <div className="container w-full">
                <div className="flex space-x-4">
                    {/* tite + reload btn */}
                    <div className="flex">
                        <label className="text-2xl font-bold text-slate-800">Danh sách tài khoản</label>
                        <button type="button" className="ml-3 text-gray-800 hover:underline">
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
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                placeholder="Tìm kiếm tài khoản"
                            />
                        </div>
                    </div>

                    <Link to="/account/add" className="btn btn-md bg-green-600 hover:bg-green-500">
                        <span className="pr-1">
                            <i className="fa fa-share"></i>
                        </span>
                        <span>Thêm tài khoản</span>
                    </Link>
                </div>
                <table className="mt-8 w-full">
                    <thead className="w-full rounded bg-blue-500 text-white">
                        <tr className="flex h-11 w-full">
                            <th className="flex w-20 items-center justify-center px-2">Mã số</th>
                            <th className="flex w-36 items-center justify-center px-2">Tên tài khoản</th>
                            <th className="flex w-56 items-center justify-start px-2">Tên nhân viên</th>
                            <th className="flex flex-1 items-center justify-start px-2">Địa chỉ email </th>
                            <th className="flex flex-1 items-center justify-start px-2">Chức vụ</th>
                            <th className="flex w-[200px] items-center justify-center px-2"></th>
                        </tr>
                    </thead>

                    <tbody className="flex h-[75vh] w-full flex-col" style={{ overflowY: 'overlay' }}>
                        {renderAccounts.map((account, index) => (
                            <tr
                                key={account._id}
                                className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                            >
                                <td
                                    className="flex w-20 items-center justify-center px-2"
                                    onClick={() => LinkToDetail(account._id)}
                                >
                                    {account.id}
                                </td>
                                <td
                                    className="flex w-36 items-center justify-start px-2"
                                    onClick={() => LinkToDetail(account._id)}
                                >
                                    {account.username}
                                </td>
                                <td
                                    className="flex w-56 items-center justify-center px-2"
                                    onClick={() => LinkToDetail(account._id)}
                                >
                                    {account.name}
                                </td>
                                <td
                                    className="flex flex-1 items-center justify-start px-2"
                                    onClick={() => LinkToDetail(account._id)}
                                >
                                    {account.email}
                                </td>
                                <td
                                    className="flex flex-1 items-center justify-start px-2"
                                    onClick={() => LinkToDetail(account._id)}
                                >
                                    {account.role?.name || '-'}
                                </td>
                                <td className="flex w-[200px] items-center justify-center px-2 py-2">
                                    <div className="flex justify-end">
                                        <Link to={'/account/update/' + account._id} className="btn btn-sm btn-blue">
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-red"
                                            onClick={() => {
                                                {
                                                    setShowDeleteDialog(true);
                                                    setDeletingAccountId(account._id);
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
                                    setDeletingAccountId(null);
                                    setShowDeleteDialog(false);
                                }}
                            >
                                Quay lại
                            </button>
                            <button className="btn btn-md btn-red" onClick={() => deleteAccount(deletingAccountId)}>
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Accounts;
