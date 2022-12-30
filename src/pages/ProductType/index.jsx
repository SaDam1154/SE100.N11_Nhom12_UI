import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
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
function ProductType() {
    const [search, setSearch] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();
    // const showDeleteNoti = () => toast.info('Xóa sản phẩm thành công!');
    // const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    // function deleteProduct(id) {
    //     fetch('http://localhost:5000/api/product/' + id, {
    //         method: 'DELETE',
    //     })
    //         .then((res) => res.json())
    //         .then((resJson) => {
    //             if (resJson) {
    //                 showDeleteNoti();
    //                 console.log('xóa');
    //                 callApi();
    //             } else {
    //                 showErorrNoti();
    //             }
    //         })
    //         .catch(() => {
    //             showErorrNoti();
    //         });
    // }
    useEffect(() => {
        callApi();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductTypes(resJson.productTypes);
                } else {
                    setProductTypes([]);
                }
            });
    }

    function linkToDetail(id) {
        navigate('/product-type/detail/' + id);
    }

    return (
        <div className="container">
            <div className="flex space-x-4">
                {/* tite + reload btn */}
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">Danh sách loại cây</label>
                    <button type="button" className="ml-3 text-gray-800 hover:underline" onClick={() => callApi()}>
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
                            placeholder="Tìm kiếm loại sản phẩm"
                        />
                    </div>

                    <Link to="/product-type/add" className="btn btn-md btn-green">
                        <span className="pr-1">
                            <i className="fa fa-share"></i>
                        </span>
                        <span>Thêm loại cây mới</span>
                    </Link>
                </div>
            </div>

            {/* LIST */}
            <table className="mt-8 w-full">
                <thead className="w-full rounded bg-blue-500 text-white">
                    <tr className="flex h-11 w-full">
                        <th className="flex w-20 items-center justify-end px-2">Mã số</th>
                        <th className="flex flex-[1] items-center justify-start pl-28">Tên loại sản phẩm</th>
                        <th className="flex flex-[1] items-center justify-start px-2">Ngày thêm</th>
                        <th className="flex w-[200px] items-center justify-center px-2"></th>
                    </tr>
                </thead>

                <tbody className="flex h-[75vh] w-full flex-col" style={{ overflowY: 'overlay' }}>
                    {productTypes
                        ?.filter((product) => {
                            if (search === '') {
                                return product;
                            } else {
                                if (
                                    removeVietnameseTones(product.name.toLowerCase()).includes(
                                        removeVietnameseTones(search.toLowerCase())
                                    )
                                ) {
                                    var id = product.id.toString();
                                    return product.id.toString().includes(id);
                                }
                            }
                        })
                        ?.map((product) => (
                            <tr
                                key={product.id}
                                className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                            >
                                <td
                                    className="flex w-20 items-center justify-center px-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.id}
                                </td>

                                <td
                                    className="flex flex-[1] items-center justify-start pl-28"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.name}
                                </td>

                                <td
                                    className="flex flex-[1] items-center justify-start px-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {moment(product.createdAt).format('HH:mm:ss DD/MM/YYYY ')}
                                </td>
                                <td className="flex w-[200px] items-center justify-center px-2 py-2">
                                    <div className="flex justify-end">
                                        <Link to={'/product-type/update/' + product.id} className="btn btn-sm btn-blue">
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-red"
                                            // onClick={() =>
                                            //     deleteProduct(product.id)
                                            // }
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
    );
}

export default ProductType;
