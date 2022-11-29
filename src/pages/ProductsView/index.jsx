import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Listbox, Popover } from "@headlessui/react";
import clsx from "clsx";
import { useEffect } from "react";

const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
];

function ProductsView() {
    const [selectedPeople, setSelectedPeople] = useState([
        people[0],
        people[1],
    ]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/product")
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.data);
                } else {
                    setProducts([]);
                }
            });
    }, []);

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
                                        value={selectedPeople}
                                        onChange={setSelectedPeople}
                                        multiple
                                    >
                                        <Listbox.Button
                                            as="div"
                                            className="text-input flex min-h-[36px] cursor-pointer items-center"
                                        >
                                            <div className="mr-2 flex-1">{`Loại cây (${selectedPeople.length})`}</div>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </Listbox.Button>
                                        <Listbox.Options>
                                            {people.map((person) => (
                                                <Listbox.Option
                                                    key={person.id}
                                                    value={person}
                                                    className="cursor-pointer hover:text-blue-500"
                                                >
                                                    {({ selected }) => (
                                                        <div className="flex items-center">
                                                            <i
                                                                className={clsx(
                                                                    "fa-solid fa-check pr-2",
                                                                    {
                                                                        "opacity-0":
                                                                            !selected,
                                                                    }
                                                                )}
                                                            ></i>
                                                            <span>
                                                                {person.name}
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
                    <Link to="/product" className="btn btn-md btn-green">
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
            <div className="grid grid-cols-5 gap-4">
                {products.map((product) => (
                    <div key={product.id} className=" rounded border ">
                        <h1 className="py-2 text-center">{product.num}</h1>
                        <h1 className="py-2 text-center">{product.id}</h1>
                        <h1 className="py-2 text-center">{product.type}</h1>
                        <h1 className="py-2 text-center">{product.name}</h1>
                        <h1 className="py-2 text-center">{product.price}</h1>
                        <div className="flex justify-center">
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsView;