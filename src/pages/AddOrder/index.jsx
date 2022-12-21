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

    const [selectedProducts, setselectedProduct] = useState(() => {
        const localJobs = JSON.parse(localStorage.getItem('selectedProducts'));
        return localJobs ?? [];
    });
    function handleSubmit(Product) {
        setselectedProduct((prev) => {
            const newSelectedProduct = [...prev, Product];
            // localStorage.setItem(
            //     'selectedProducts',
            //     JSON.stringify(new SelectedProduct())
            // );
            return newSelectedProduct;
        });
    }
    function handlClearJobsStorage() {
        setselectedProduct([]);
        return localStorage.clear('selectedProducts');
    }
    //Views
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();

    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    useEffect(() => {
        callApi();
        callApiProductTypes();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                } else {
                    setProducts([]);
                }
            });
    }
    function callApiProductTypes() {
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
        navigate('/product/detail/' + id);
    }

    //end

    return (
        <div className="container w-full">
            <CustomerInput />
            <div className="mt-2 flex">
                {/* LEFT VIEW */}
                <div className="flex flex-grow flex-col rounded-md border py-3 px-2 shadow">
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
                    <div className="flex h-[70vh] flex-col overflow-scroll">
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

                <div className="ml-4 mt-1 flex   flex-col  border-2 border-solid py-1  px-2 shadow-xl">
                    <label className="text-center align-middle text-2xl font-bold text-blue-800">Hóa đơn</label>

                    {/* table */}
                    <table className="mt-1 w-[550px] max-w-[600px]  flex-grow">
                        <thead className="w-[500px] rounded border-b bg-gray-700 text-sm font-medium text-white">
                            <tr className="flex h-11 w-fit">
                                <th className=" max-w-12 flex w-12 items-center justify-center  ">#</th>
                                <th className="flex w-12 items-center justify-center ">Ảnh</th>
                                <th className="  flex w-36   items-center justify-center ">Tên cây</th>
                                <th className="flex w-28  items-center justify-center ">Loại cây</th>
                                <th className="w flex w-20 items-center justify-end ">Giá (VND)</th>
                                <th className="flex w-14 items-center justify-end ">Số lượng</th>
                            </tr>
                        </thead>

                        <tbody className=" over flex h-[290px] w-full  flex-col overflow-y-scroll">
                            {selectedProducts?.map((selectedProduct, index) => (
                                <tr
                                    key={selectedProduct.id}
                                    className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                    onClick={() => linkToDetail(selectedProduct.id)}
                                >
                                    <td className="flex w-12 items-center justify-center px-1">{index + 1}</td>
                                    <td className="w-22 flex items-center justify-center px-1 py-1">
                                        <img
                                            src={selectedProduct.image || '/placeholder.png'}
                                            className="h-10 w-10 rounded-full object-cover object-center"
                                        />
                                    </td>
                                    <td className=" flex w-36   items-center justify-start  px-1 py-1">
                                        {selectedProduct?.name || '-'}
                                    </td>
                                    <td className="flex w-28   items-center justify-center px-1 py-1">
                                        {selectedProduct.type?.name || '-'}
                                    </td>
                                    <td className="flex w-20 items-center justify-end px-1 py-1">
                                        {selectedProduct.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </td>
                                    <td className="flex w-12 items-center justify-end px-1 py-1">
                                        {/* {selectedProduct.quantity} */}1
                                    </td>
                                    <td className="flex w-12 flex-grow items-center justify-center px-1 py-1">
                                        <button className="btn btn-sm btn-red float-right w-14">
                                            <span className="pr-1">
                                                <i className="fa-solid fa-circle-xmark"></i>
                                            </span>
                                            <span>Xoá</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex flex-col">
                        <div className=" flex">
                            <label>Ngày đặt : </label>
                            <TimeNow />
                        </div>
                        <label className="">Tổng tiền: </label>
                    </div>
                    <div className="flex flex-grow flex-col-reverse">
                        <div className=" ba  ml-[3%] flex justify-center pr-[5%]">
                            <button className="btn btn-blue btn-md w-1/2 ">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Thêm</span>
                            </button>
                            <button className="btn btn-red btn-md w-1/2 ">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Hủy</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
//
//
export default AddOrder;
