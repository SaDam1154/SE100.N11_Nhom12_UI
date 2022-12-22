import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';
import moment from 'moment';
import PriceFormat from '../../components/PriceFormat';
import { toast, ToastContainer } from 'react-toastify';
function Orders() {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingOrderId, setDeletingOrderId] = useState(null);
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const showDeleteNoti = () => toast.info('Xóa hoá đơn thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    useEffect(() => {
        getOrders();
    }, []);

    function getOrders() {
        fetch('http://localhost:5000/api/order')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setOrders(resJson.orders);
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setOrders([]);
            });
    }

    function deleteOrder(id) {
        fetch('http://localhost:5000/api/order/' + id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                setShowDeleteDialog(false);
                if (resJson) {
                    showDeleteNoti();
                    console.log('xóa');
                    getOrders();
                } else {
                    showErorrNoti();
                }
            })
            .catch(() => {
                showErorrNoti();
                setShowDeleteDialog(false);
            });
    }

    function linkToDetail(id) {
        navigate('/order/detail/' + id);
    }

    return (
        <>
            <div className="container">
                <div className="flex space-x-4">
                    {/* tite + reload btn */}
                    <div className="flex">
                        <label className="text-2xl font-bold text-slate-800">Danh sách hóa đơn</label>
                        <button
                            type="button"
                            className="ml-3 text-gray-800 hover:underline"
                            onClick={() => getOrders()}
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
                            {/* <input
                                type="text"
                                className="text-input grow"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                placeholder="Tìm kiếm sản phẩm"
                            /> */}
                        </div>

                        <Link to="/order/add" className="btn btn-md btn-green">
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Tạo hoá đơn</span>
                        </Link>
                    </div>
                </div>

                {/* LIST */}
                <table className="mt-8 w-full">
                    <thead className="w-full rounded bg-blue-500 text-white">
                        <tr className="flex h-11 w-full">
                            <th className="flex w-16 items-center justify-end px-2">Mã</th>
                            <th className="flex flex-[2] items-center justify-start px-4">Tên khách hàng</th>
                            <th className="flex w-60 items-center justify-start px-2">Số điện thoại</th>
                            <th className="flex w-44 items-center justify-end px-2">Tổng tiền (VNĐ)</th>
                            <th className="flex w-56 items-center justify-end px-2">Ngày</th>
                            <th className="flex w-[140px] items-center justify-center px-2"></th>
                        </tr>
                    </thead>

                    <tbody className="flex h-[75vh] w-full flex-col" style={{ overflowY: 'overlay' }}>
                        {orders?.map((order) => (
                            <tr
                                key={order.id}
                                className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                onClick={() => linkToDetail(order.id)}
                            >
                                <td className="flex w-16 items-center justify-end px-2 py-2">{order.id}</td>
                                <td className="flex flex-[2] items-center justify-start px-4 py-2">
                                    {order.customer?.name}
                                </td>
                                <td className="flex w-60 items-center justify-start px-2 py-2">
                                    {order.customer?.phone}
                                </td>
                                <td className="flex w-44 items-center justify-end px-2 py-2">
                                    <PriceFormat>{order.totalPrice}</PriceFormat>
                                </td>
                                <td className="flex w-56 items-center justify-end px-2 py-2">
                                    {moment(order.createdAt).format('HH:mm:ss DD/MM/YYYY ')}
                                </td>
                                <td className="flex w-[140px] items-center justify-center px-2 py-2">
                                    <div className="flex justify-end">
                                        <button
                                            className="btn btn-sm btn-red"
                                            onClick={(e) => {
                                                {
                                                    e.stopPropagation();
                                                    setShowDeleteDialog(true);
                                                    setDeletingOrderId(order.id);
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
                <ToastContainer hideProgressBar />
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
                                    setDeletingOrderId(null);
                                    setShowDeleteDialog(false);
                                }}
                            >
                                Quay lại
                            </button>
                            <button className="btn btn-md btn-red" onClick={() => deleteOrder(deletingOrderId)}>
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
