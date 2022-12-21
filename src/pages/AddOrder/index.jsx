import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import TimeNow from '../../components/TimeNow';
import PriceFormat from '../../components/PriceFormat';
import CustomerInput from './CustomerInput';
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
function AddOrder() {
    const [search, setSearch] = useState('');

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setProducts([]);
            });
    }, []);

    return (
        <div className="container w-full">
            <CustomerInput />
            <div className="mt-2 flex">
                {/* LEFT VIEW */}
                <div className="flex flex-1 flex-col rounded-md border py-3 px-2 shadow">
                    {/* HEADER ACTION GROUP */}
                    <div className="flex space-x-2 pb-2">
                        {/* ID */}
                        <input
                            type="text"
                            className="text-input w-16 py-1"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="Mã"
                        />

                        {/* Search */}
                        <input
                            type="text"
                            className="text-input flex-1 py-1"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="Tìm kiếm sản phẩm"
                        />
                    </div>

                    {/* LIST PRODUCT */}
                    <div className="flex h-[68vh] flex-col overflow-scroll">
                        <div className=" grid max-h-[100] min-h-[50] grid-cols-3 gap-2">
                            {products
                                .filter((product) => {
                                    if (search === '') {
                                        return product;
                                    } else {
                                        if (
                                            removeVietnameseTones(product.name.toLowerCase()).includes(
                                                removeVietnameseTones(search.toLowerCase())
                                            ) ||
                                            removeVietnameseTones(product?.type.name.toLowerCase()).includes(
                                                removeVietnameseTones(search.toLowerCase())
                                            )
                                        ) {
                                            var id = product.id.toString();
                                            return product.id.toString().includes(id);
                                        }
                                    }
                                })
                                ?.map((product) => (
                                    <div
                                        key={product.id}
                                        className="cursor-pointer select-none overflow-hidden rounded-md border shadow"
                                        onClick={() => handleSubmit(product)}
                                    >
                                        <img
                                            className="aspect-[5/3] w-full object-cover"
                                            src={product.image || '/placeholder.png'}
                                        />
                                        <div className="space-y-1 p-2">
                                            <p className="font-semibold text-blue-600">{product.name}</p>
                                            <p className="text-sm font-semibold">{product.type?.name || '-'}</p>
                                            <p className="">
                                                <PriceFormat>{product.price}</PriceFormat>
                                                <span className="ml-1">VNĐ</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT ORDER */}
                <div className="ml-3 flex flex-1 flex-col rounded-md border py-1 px-2 shadow">
                    <p className="text-center text-lg font-semibold">Hóa đơn</p>

                    {/* LIST PRODUCT */}
                    <table className="mt-2 w-full">
                        <thead className="w-full rounded bg-blue-500 text-white">
                            <tr className="flex h-11 w-full">
                                <th className="flex w-10 items-center justify-end px-2 text-center">Mã</th>
                                <th className="flex w-16 items-center justify-center px-2">Ảnh</th>
                                <th className="flex flex-1 items-center justify-start px-2">Tên cây</th>
                                <th className="flex w-28 items-center justify-end px-2">Giá (VND)</th>
                                <th className="flex w-24 items-center justify-end px-2">Số lượng</th>
                                <th className="flex w-20 items-center justify-center px-2"></th>
                            </tr>
                        </thead>

                        <tbody className="flex h-[400px] w-full flex-col" style={{ overflowY: 'overlay' }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8].map((product, index) => (
                                <tr key={index} className="flex border-b border-slate-200 hover:bg-slate-100">
                                    <td className="flex w-10 items-center justify-end px-2 py-2">1</td>
                                    <td className="flex w-16 items-center justify-center px-2 py-2">
                                        <img
                                            src={'' || '/placeholder.png'}
                                            className="h-10 w-10 rounded-full object-cover object-center"
                                        />
                                    </td>
                                    <td className="flex flex-[2] items-center justify-start px-2 py-2">
                                        Cay xuong roong
                                    </td>
                                    <td className="flex w-28 items-center justify-end px-2 py-2">
                                        <PriceFormat>{50000}</PriceFormat>
                                    </td>
                                    <td className="flex w-24 items-center justify-end px-2 py-2">
                                        <input
                                            type="number"
                                            min="1"
                                            className={clsx('text-input w-16 py-1 text-right text-base')}
                                        />
                                    </td>
                                    <td className="flex w-20 items-center justify-center px-2 py-2">
                                        <button
                                            className="btn btn-sm btn-red"
                                            // onClick={() => deleteProduct(product.id)}
                                        >
                                            <span>Xoá</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex grow items-center justify-between">
                        <div className="flex items-center">
                            <p className="">Tổng tiền: </p>
                        </div>
                        <button className="btn btn-blue btn-md ">
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Tạo hoá đơn</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
//
//
export default AddOrder;
