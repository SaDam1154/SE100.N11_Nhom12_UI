import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import TypeProduct from '../../components/TypeProduct';

function AddOrder() {
    // const [customers, setCustomers] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/customer')
    //         .then((res) => res.json())
    //         .then((resJson) => {
    //             if (resJson.success) {
    //                 setCustomers(resJson.customers);
    //             } else {
    //                 setCustomers([]);
    //             }
    //         });
    // }, []);
    // const [productType, setProductType] = useState([]);
    // const [productName, setProductName] = useState([]);
    // const [productQuanity, setProductQuanity] = useState([]);
    // const [productPrice, setProductPrice] = useState([]);
    // const [selectedProduct, setSelectedProduct] = useState([
    //     {
    //         name: '',
    //         price: '',
    //         type: '',
    //         quantity: '',
    //         imageFile: '',
    //         date: '',
    //     },
    // ]);
    // const [selectedProducts, setSelectedProducts] = useState([]);

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    const [selectedProducts, setselectedProduct] = useState(() => {
        const localJobs = JSON.parse(localStorage.getItem('selectedProducts'));
        return localJobs ?? [];
    });
    function handleSubmit(selectedProduct) {
        setselectedProduct((prev) => {
            const newSelectedProduct = [
                ...prev,
                {
                    id: selectedProduct._id,
                    name: selectedProduct.name,
                    type: selectedProduct.type,
                    quantity: selectedProduct.quantity,
                    price: selectedProduct.price,
                },
            ];
            // localStorage.setItem(
            //     'selectedProducts',
            //     JSON.stringify(new SelectedProduct())
            // );
            return newSelectedProduct;
        });
        console.log(selectedProduct);
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
                } else {
                    setCustomerName('');
                    setCustomerAddress('');
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
                <div className="flex flex-col px-2 shadow-md">
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
                    <div className="flex h-[520px] flex-col overflow-scroll">
                        <div className=" grid max-h-[50] grid-cols-4 gap-4   ">
                            {products?.map((product) => (
                                <div
                                    key={product.id}
                                    className="  cursor-pointer select-none  overflow-hidden rounded border shadow-lg"
                                    onClick={() => handleSubmit(product)}
                                >
                                    <h1 className="py-2 text-center">
                                        {product.num}
                                    </h1>
                                    <h1 className="py-2 text-center">
                                        {product.id}
                                    </h1>
                                    <h1 className="py-2 text-center">
                                        {product.type?.name || '-'}
                                    </h1>
                                    <h1 className="py-2 text-center">
                                        {product.name}
                                    </h1>
                                    <h1 className="py-2 text-center">
                                        {product.price}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="ml-4 mt-1 flex w-full flex-1 flex-col  border-2 border-solid py-4  px-4 shadow-xl">
                    <label className="text-center align-middle text-2xl font-bold text-blue-800">
                        Hóa đơn
                    </label>
                    <label className="">Tên khách hàng : {customerName}</label>
                    <label className="">Số điện thoại : {customerPhone}</label>
                    <label className="">Địa chỉ : {customerAddress}</label>
                    {/* table */}

                    <div className="flex flex-col border-2 border-solid  ">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="flex min-w-full flex-col text-center">
                                        <thead className="border-b bg-gray-800 ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-medium text-white"
                                                >
                                                    #
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-medium text-white"
                                                >
                                                    Tên
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-medium text-white"
                                                >
                                                    Loại
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-medium text-white"
                                                >
                                                    Số lượng
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-medium text-white"
                                                >
                                                    Giá(VND)
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-4 text-sm font-medium text-white"
                                                >
                                                    Handleeee
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="flex h-[300px]  w-[550px] flex-col overflow-y-scroll">
                                            {selectedProducts?.map(
                                                (selectedProduct, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b bg-white"
                                                    >
                                                        <td className="max-w-2xl whitespace-normal px-6 py-4 text-sm font-medium text-gray-900">
                                                            {index + 1}
                                                        </td>

                                                        <td className=" max-w-[130px] overflow-hidden  px-6 py-4 text-sm font-medium text-gray-900">
                                                            {selectedProduct?.name ||
                                                                '-'}
                                                        </td>
                                                        <td className="max-w-2xl whitespace-normal px-6 py-4 text-sm font-light text-gray-900">
                                                            {selectedProduct
                                                                ?.type?.name ||
                                                                '-'}
                                                        </td>
                                                        <td className="max-w-2xl whitespace-normal px-6 py-4 text-sm font-light text-gray-900">
                                                            {selectedProduct?.quantity ||
                                                                '-'}
                                                        </td>
                                                        <td className="max-w-2xl whitespace-normal px-6 py-4 text-sm font-light text-gray-900">
                                                            {selectedProduct?.price ||
                                                                '-'}
                                                        </td>
                                                        <td className="max-w-2xl px-6 py-4 text-sm font-light text-gray-900">
                                                            <button className="btn btn-sm btn-red">
                                                                <span className="pr-1">
                                                                    <i className="fa-solid fa-circle-xmark"></i>
                                                                </span>
                                                                <span>Xoá</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* end */}

                    <div className="float-right ml-[3%]  flex  justify-center pr-[5%]">
                        <button className="btn btn-blue btn-md w-1/2 ">
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Thêm</span>
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
