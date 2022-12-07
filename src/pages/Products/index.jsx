import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';

function Products() {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();

    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    useEffect(() => {
        callApi();
        console.log(products);
        callApiPeople();
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
    function callApiPeople() {
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

    return (
        <div className="container">
            <div className="flex space-x-4">
                {/* tite + reload btn */}
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">
                        Danh sách cây
                    </label>
                    <button
                        type="button"
                        className="ml-3 text-gray-800 hover:underline"
                        onClick={() => callApi()}
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
                                        onChange={setSelectedProductTypes}
                                        multiple
                                    >
                                        <Listbox.Button
                                            as="div"
                                            className="text-input flex min-h-[36px] cursor-pointer items-center"
                                        >
                                            <div className="mr-2 flex-[1]">{`Loại cây (${selectedProductTypes.length})`}</div>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </Listbox.Button>
                                        <Listbox.Options>
                                            {productTypes.map((type) => (
                                                <Listbox.Option
                                                    key={type._id}
                                                    value={type}
                                                    className="cursor-pointer hover:text-blue-500"
                                                >
                                                    {({ selected }) => (
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
                                                                {type.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Popover>
                    <Link to="/product/views" className="btn btn-md btn-green">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Views</span>
                    </Link>
                    <Link to="/product/add" className="btn btn-md btn-green">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm cây mới</span>
                    </Link>
                </div>
            </div>

            {/* LIST */}
            <table className="mt-8 w-full">
                <thead className="w-full rounded bg-blue-500 text-white">
                    <tr className="flex h-11 w-full">
                        <th className="flex w-14 items-center justify-end px-2">
                            STT
                        </th>
                        <th className="flex w-24 items-center justify-center px-2">
                            Ảnh
                        </th>
                        <th className="flex flex-[2] items-center justify-start px-2">
                            Tên cây
                        </th>
                        <th className="flex flex-[1] items-center justify-start px-2">
                            Loại cây
                        </th>
                        <th className="flex w-28 items-center justify-end px-2">
                            Giá (VND)
                        </th>
                        <th className="flex w-24 items-center justify-end px-2">
                            Số lượng
                        </th>
                        <th className="flex w-[200px] items-center justify-center px-2"></th>
                    </tr>
                </thead>

                <tbody
                    className="flex h-[400px] w-full flex-col"
                    style={{ overflowY: 'overlay' }}
                >
                    {products
                        .filter((product) => {
                            return search.toLowerCase() === ''
                                ? product
                                : product.name.toLowerCase().includes(search) ||
                                      product?.type.name
                                          .toLowerCase()
                                          .includes(search);
                        })
                        ?.map((product, index) => (
                            <tr
                                key={product.id}
                                className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                onClick={() => linkToDetail(product.id)}
                            >
                                <td className="flex w-14 items-center justify-end px-2 py-2">
                                    {index + 1}
                                </td>
                                <td className="flex w-24 items-center justify-center px-2 py-2">
                                    <img
                                        src={
                                            product.image || '/placeholder.png'
                                        }
                                        className="h-10 w-10 rounded-full object-cover object-center"
                                    />
                                </td>
                                <td className="flex flex-[2] items-center justify-start px-2 py-2">
                                    {product.name}
                                </td>
                                <td className="flex flex-[1] items-center justify-start px-2 py-2">
                                    {product.type?.name || '-'}
                                </td>
                                <td className="flex w-28 items-center justify-end px-2 py-2">
                                    {product.price}
                                </td>
                                <td className="flex w-24 items-center justify-end px-2 py-2">
                                    {product.quantity}
                                </td>
                                <td className="flex w-[200px] items-center justify-center px-2 py-2">
                                    <div className="flex justify-end">
                                        <button className="btn btn-sm btn-blue">
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </button>
                                        <button className="btn btn-sm btn-red">
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

export default Products;
