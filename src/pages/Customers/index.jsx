const customers = [
    {
        num: 1,
        id: 1000001,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 2,
        id: 1000002,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 3,
        id: 1000003,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 4,
        id: 1000004,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 5,
        id: 1000005,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 6,
        id: 1000006,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
    {
        num: 7,
        id: 1000007,
        name: "Nguyễn Văn A",
        phone: "0917823923",
        address: "Số 34, đường Gì Đó, phường Ngẫu Nhiên....",
    },
];

function Customers() {
    return;
    <div className="wrapper">
        <div className="flex">
            <label className="text-2xl font-bold text-slate-800">
                Danh sách cây
            </label>
            <button
                type="button"
                className="flex  mx-2  items-center justify-center rounded px-4 py-1.5 text-gray-800 hover:bg-blue-400"
            >
                <span className="button-icon">
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </span>
                <span className="">Tải lại</span>
            </button>
            <div className="flex grow">
                <input type="text" className="grow  rounded bg-gray-300" />

                <button type="button" className="">
                    <span className="px-4 rounded">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                </button>

                <button type="button" className="px-5">
                    <span className="">
                        <i className="fas fa-filter"></i>
                    </span>
                </button>
            </div>
            <button className="flex items-center justify-center rounded bg-green-600 px-4 py-1.5 text-white hover:bg-green-500">
                <span className="pr-1">
                    <i className="fa-solid fa-circle-plus"></i>
                </span>
                <span>Thêm cây mới</span>
            </button>
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

            <thead className="h-11 bg-blue-500 text-white rounded">
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã KH</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col"></th>
                </tr>
            </thead>

            <tbody className="list_tree_body">
                {products.map((product) => (
                    <tr
                        key={product.id}
                        className="border-b cursor-pointer border-slate-200 hover:bg-slate-100"
                    >
                        <td className="py-2 text-center">{product.num}</td>
                        <td className="py-2 text-center">{product.id}</td>
                        <td className="py-2 text-center">{product.name}</td>
                        <td className="py-2 text-center">{product.phone}</td>
                        <td className="py-2 text-center">{product.address}</td>

                        <td className="py-2 text-center">
                            <div className="flex">
                                <button className="flex items-center justify-center rounded bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-400">
                                    <span className="pr-1">
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </span>
                                    <span>Sửa</span>
                                </button>
                                <button className="flex items-center ml-2 justify-center rounded bg-red-500 px-4 py-1.5 text-white hover:bg-red-400">
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
    </div>;
}

export default Customers;
