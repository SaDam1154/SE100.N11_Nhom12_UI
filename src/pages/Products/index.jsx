import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";

const products = [
    {
        num: 1,
        id: 1000001,
        type: "Cây cảnh",
        name: "Xương rồng",
        price: 450000,
    },
    {
        num: 2,
        id: 1000003,
        type: "Cây Nhật Mạt Hương",
        name: "Sen đá",
        price: 450000,
    },
    {
        num: 3,
        id: 1000003,
        type: "Cây sen đá kim cương tím",
        name: "Sen đá",
        price: 450000,
    },
    {
        num: 4,
        id: 1000004,
        type: "Sen đá Giva",
        name: "Sen đá",
        price: 450000,
    },
    {
        num: 5,
        id: 1000005,
        type: "Cây Bình An",
        name: "Dây leo",
        price: 450000,
    },
];

function Products() {
    return (
        <div>
            <div className="flex space-x-4">
                {/* tite + reload btn */}
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">
                        Danh sách cây
                    </label>
                    <button
                        type="button"
                        className="ml-3 text-gray-800 hover:underline"
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
                            placeholder="Tìm kiếm sản phẩm"
                        />

                        <button className="btn btn-md bg-slate-200 !px-3 text-slate-600 hover:bg-slate-300">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>

                    <Popover className="relative mr-2">
                        <Popover.Button className="btn btn-md h-full bg-slate-200 !px-3 text-slate-600 outline-none hover:bg-slate-300">
                            <i className="fas fa-filter"></i>
                        </Popover.Button>

                        <Popover.Panel
                            as="div"
                            className="absolute right-0 z-10 rounded border bg-white p-5 shadow"
                        >
                            <p>fasdfasdfasdfasdfsad</p>
                            <p>fasdfasdfasdfasdfsad</p>
                            <p>fasdfasdfasdfasdfsad</p>
                            <p>fasdfasdfasdfasdfsad</p>
                            <p>fasdfasdfasdfasdfsad</p>
                        </Popover.Panel>
                    </Popover>

                    <Link
                        to="/product/add"
                        className="btn btn-md bg-green-600 hover:bg-green-500"
                    >
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm cây mới</span>
                    </Link>
                </div>
            </div>
            <table className="mt-4 w-full">
                <colgroup>
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "10%" }} />
                </colgroup>

                <thead className="h-11 rounded bg-blue-500 text-white">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã số</th>
                        <th scope="col">Loại cây</th>
                        <th scope="col">Tên cây</th>
                        <th scope="col">Giá (VND)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                        >
                            <td className="py-2 text-center">{product.num}</td>
                            <td className="py-2 text-center">{product.id}</td>
                            <td className="py-2 text-center">{product.type}</td>
                            <td className="py-2 text-center">{product.name}</td>
                            <td className="py-2 text-center">
                                {product.price}
                            </td>
                            <td className="py-2 text-center">
                                <div className="flex justify-end">
                                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-400">
                                        <span className="pr-1">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </span>
                                        <span>Sửa</span>
                                    </button>
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

export default Products;
