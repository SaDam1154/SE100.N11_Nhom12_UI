import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import TimeNow from '../../components/TimeNow';
function AddOrder() {
    const [search, setSearch] = useState('');

    const [customer, setCustomer] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/api/customer')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setCustomer(resJson.customers);
                } else {
                    setCustomer([]);
                }
            });
    }, []);

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

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
    useEffect(() => {
        callApiCustomer();
    }, [customerPhone]);

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
    function callApiCustomer() {
        fetch(
            `http://localhost:5000/api/customer?filters={"phone": "${customerPhone}"}`
        )
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success && resJson.customers[0]) {
                    setCustomerName(resJson.customers[0].name);
                    setCustomerAddress(resJson.customers[0].address);
                }
            });
    }

    function linkToDetail(id) {
        navigate('/product/detail/' + id);
    }

    //end

    return (
        <div className="container w-full">
            <div className="flex  py-2 px-2 text-lg shadow-md">
                <div className="flex basis-1/4 flex-col">
                    <label className="mb-1 font-semibold" htmlFor="name">
                        Số điện thoại{' '}
                    </label>
                    <input
                        type="text"
                        value={customerPhone}
                        className="text-input mr-8 py-[5px]"
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="flex basis-1/4 flex-col">
                    <label className="mb-1 font-semibold" htmlFor="type">
                        Tên khách hàng
                    </label>
                    <input
                        type="text"
                        value={customerName}
                        className="text-input mr-8 py-[5px]"
                        id="type"
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div className="flex basis-1/2 flex-col pl-4">
                    <label className="mb-1 font-semibold" htmlFor="type">
                        Địa chỉ
                    </label>
                    <input
                        type="text"
                        value={customerAddress}
                        className="text-input mr-8 py-[5px]"
                        id="type"
                        onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex ">
                <div className="flex flex-grow flex-col px-2 shadow-md">
                    <div className="flex space-x-4  py-3">
                        {/* tite + reload btn */}
                        <div className="flex">
                            <label className="text-2xl font-bold text-slate-800">
                                Danh sách cây
                            </label>
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
                                    placeholder="Tìm kiếm sản phẩm"
                                />
                            </div>

                            <Popover className="relative mr-2">
                                <Popover.Button className="btn btn-md h-full !min-w-0 bg-slate-200 !px-3 text-slate-600 outline-none hover:bg-slate-300">
                                    <i className="fas fa-filter"></i>
                                </Popover.Button>

                                <Popover.Panel
                                    as="div"
                                    className="absolute right-0 z-10 min-w-[280px] max-w-[320px] rounded border bg-white px-4 py-3 shadow"
                                >
                                    <h2 className="mb-2 text-lg font-semibold">
                                        Lọc sản phẩm
                                    </h2>

                                    <hr />
                                    <div className="mt-3 space-x-2">
                                        <div>
                                            <Listbox
                                                value={selectedProductTypes}
                                                onChange={
                                                    setSelectedProductTypes
                                                }
                                                multiple
                                            >
                                                <Listbox.Button
                                                    as="div"
                                                    className="text-input flex min-h-[36px] cursor-pointer items-center"
                                                >
                                                    <div className="mr-2 flex-1">{`Loại cây (${selectedProductTypes.length})`}</div>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </Listbox.Button>
                                                <Listbox.Options>
                                                    {productTypes.map(
                                                        (type) => (
                                                            <Listbox.Option
                                                                key={type._id}
                                                                value={type}
                                                                className="cursor-pointer hover:text-blue-500"
                                                            >
                                                                {({
                                                                    selected,
                                                                }) => (
                                                                    <div className="flex items-center">
                                                                        <i
                                                                            className={clsx(
                                                                                'fa-solid fa-check pr-2',
                                                                                {
                                                                                    'opacity-0':
                                                                                        !selected,
                                                                                }
                                                                            )}
                                                                        ></i>
                                                                        <span>
                                                                            {
                                                                                type.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </Listbox.Option>
                                                        )
                                                    )}
                                                </Listbox.Options>
                                            </Listbox>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex h-[70vh] flex-col overflow-scroll">
                        <div className=" grid max-h-[100] min-h-[50] grid-cols-3 gap-4  ">
                            {products
                                .filter((product) => {
                                    return search.toLowerCase() === ''
                                        ? product
                                        : product.name
                                              .toLowerCase()
                                              .includes(search) ||
                                              product?.type.name
                                                  .toLowerCase()
                                                  .includes(search);
                                })
                                ?.map((product) => (
                                    <div
                                        key={product.id}
                                        className="  cursor-pointer select-none  overflow-hidden rounded border shadow-lg"
                                        onClick={() => handleSubmit(product)}
                                    >
                                        <img
                                            className=" w-[300px] py-2 text-center"
                                            src={product.image}
                                        />
                                        <h1 className="py-2 text-center">
                                            {product.type?.name || '-'}
                                        </h1>
                                        <h1 className="py-2 text-center">
                                            {product.name}
                                        </h1>
                                        <h1 className="py-2 text-center">
                                            {product.price
                                                .toFixed(0)
                                                .replace(
                                                    /(\d)(?=(\d{3})+(?!\d))/g,
                                                    '$1,'
                                                )}
                                        </h1>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="ml-4 mt-1 flex   flex-col  border-2 border-solid py-1  px-2 shadow-xl">
                    <label className="text-center align-middle text-2xl font-bold text-blue-800">
                        Hóa đơn
                    </label>

                    {/* table */}
                    <table className="mt-1 w-[550px] max-w-[600px]">
                        <thead className="w-[500px] rounded border-b bg-gray-700 text-sm font-medium text-white">
                            <tr className="flex h-11 w-fit">
                                <th className=" max-w-12 flex w-12 items-center justify-center  ">
                                    #
                                </th>
                                <th className="flex w-12 items-center justify-center ">
                                    Ảnh
                                </th>
                                <th className="  flex w-36   items-center justify-center ">
                                    Tên cây
                                </th>
                                <th className="flex w-28  items-center justify-center ">
                                    Loại cây
                                </th>
                                <th className="w flex w-20 items-center justify-end ">
                                    Giá (VND)
                                </th>
                                <th className="flex w-14 items-center justify-end ">
                                    Số lượng
                                </th>
                            </tr>
                        </thead>

                        <tbody className=" over flex h-[250px] w-full flex-col overflow-y-scroll">
                            {selectedProducts?.map((selectedProduct, index) => (
                                <tr
                                    key={selectedProduct.id}
                                    className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                    onClick={() =>
                                        linkToDetail(selectedProduct.id)
                                    }
                                >
                                    <td className="flex w-12 items-center justify-center px-1">
                                        {index + 1}
                                    </td>
                                    <td className="w-22 flex items-center justify-center px-1 py-1">
                                        <img
                                            src={
                                                selectedProduct.image ||
                                                '/placeholder.png'
                                            }
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
                                        {selectedProduct.price
                                            .toFixed(0)
                                            .replace(
                                                /(\d)(?=(\d{3})+(?!\d))/g,
                                                '$1,'
                                            )}
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
                        <label className="">
                            Tên khách hàng : {customerName}
                        </label>
                        <label className="">
                            Số điện thoại : {customerPhone}
                        </label>
                        <label className="">Địa chỉ : {customerAddress}</label>
                        <div className=" flex">
                            <label>Ngày đặt : </label>
                            <TimeNow />
                        </div>
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
