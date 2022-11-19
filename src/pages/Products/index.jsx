const products = [
    {
        num: 1,
        id: 123,
        type: 'Cây cảnh',
        name: 'Xương rồng',
        price: 450000,
    },
    {
        num: 1,
        id: 456,
        type: 'Cây cảnh',
        name: 'Xương rồng',
        price: 450000,
    },
    {
        num: 1,
        id: 789,
        type: 'Cây cảnh',
        name: 'Xương rồng',
        price: 450000,
    },
    {
        num: 1,
        id: 657,
        type: 'Cây cảnh',
        name: 'Xương rồng',
        price: 450000,
    },
    {
        num: 1,
        id: 468,
        type: 'Cây cảnh',
        name: 'Xương rồng',
        price: 450000,
    },
];

function Products() {
    return (
        <div className="main_window__table_tree">
            <h1 className="text-2xl font-bold text-slate-900">Danh sách cây</h1>
            <table className="mt-4 w-full">
                <colgroup>
                    <col span="1" style={{ width: '10%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '10%' }} />
                </colgroup>

                <thead className="h-11 bg-blue-500 text-white">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã số</th>
                        <th scope="col">Loại cây</th>
                        <th scope="col">Tên cây</th>
                        <th scope="col">Giá (VND)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody className="list_tree_body">
                    {products.map((product) => (
                        <tr className="border-b cursor-pointer border-slate-200 hover:bg-slate-100">
                            <td className="py-2 text-center">{product.num}</td>
                            <td className="py-2 text-center">{product.id}</td>
                            <td className="py-2 text-center">{product.type}</td>
                            <td className="py-2 text-center">{product.name}</td>
                            <td className="py-2 text-center">{product.price}</td>
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
                                            <i className="fa-solid fa-circle-plus"></i>
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
