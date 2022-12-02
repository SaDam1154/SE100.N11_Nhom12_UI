import { useEffect, useState } from 'react';

const initOrder = {
    id: 0,
    name: '',
    type: '',
    quanity: '',
    price: '',
};
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
    const [productType, setProductType] = useState([]);
    const [productName, setProductName] = useState([]);
    const [productQuanity, setProductQuanity] = useState([]);
    const [productPrice, setProductPrice] = useState([]);

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    const [order, setOrder] = useState(initOrder);
    const [orders, setOrders] = useState(() => {
        const localJobs = JSON.parse(localStorage.getItem('orders'));
        return localJobs ?? [];
    });
    function handleSubmit() {
        setOrders((prev, index) => {
            const newOrder = [
                ...prev,
                {
                    id: index,
                    name: productName,
                    type: productType,
                    quanity: productQuanity,
                    price: productPrice,
                },
            ];
            localStorage.setItem('orders', JSON.stringify(newOrder));
            return newOrder;
        });
        setOrder('');
    }
    function handlClearJobsStorage() {
        setOrders([]);
        return localStorage.clear('orders');
    }

    return (
        <div className="container">
            <div className="flex  border-4 border-solid py-4 text-lg">
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
                <div className="flex basis-1/2 flex-col">
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
            <div className="flex">
                <div className="mt-1  flex basis-1/4 flex-col border-4 border-solid py-4 text-lg">
                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="name">
                            Loại cây
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={productType}
                            className="text-input mr-8 py-[5px]"
                            onChange={(e) => setProductType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="name">
                            Tên cây
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={productName}
                            className="text-input mr-8 py-[5px]"
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="type">
                            Số lượng
                        </label>
                        <input
                            type="text"
                            value={productQuanity}
                            className="text-input mr-8 py-[5px]"
                            onChange={(e) => setProductQuanity(e.target.value)}
                            id="type"
                        />
                    </div>
                    <div className="flex flex-col px-2 py-2">
                        <label className="mb-1 font-semibold" htmlFor="type">
                            Giá
                        </label>
                        <input
                            type="text"
                            value={productPrice}
                            className="text-input mr-8 py-[5px]"
                            onChange={(e) => setProductPrice(e.target.value)}
                            id="type"
                        />
                    </div>
                    <div className="  mt-1 flex justify-center py-4 px-4 text-center text-lg">
                        <button
                            className="btn btn-blue btn-md "
                            onClick={handleSubmit}
                        >
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Add</span>
                        </button>
                        <button
                            className="btn btn-blue btn-md "
                            onClick={handlClearJobsStorage}
                        >
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Clear</span>
                        </button>
                    </div>
                    <div className="  mt-1 flex justify-center py-4 px-4 text-center text-lg"></div>
                </div>
                <div className="mt-1 flex basis-3/4 flex-col  ">
                    <label className="text-center align-middle text-2xl font-bold text-blue-800">
                        Hóa đơn
                    </label>
                    <label className="">Tên khách hàng : {customerName}</label>
                    <label className="">Số điện thoại : {customerPhone}</label>
                    <label className="">Địa chỉ : {customerAddress}</label>
                    <table className="mt-4 w-full">
                        <colgroup>
                            <col span="1" style={{ width: '10%' }} />
                            <col span="1" style={{ width: '20%' }} />
                            <col span="1" style={{ width: '20%' }} />
                            <col span="1" style={{ width: '10%' }} />
                            <col span="1" style={{ width: '20%' }} />
                            <col span="1" style={{ width: '10%' }} />
                        </colgroup>

                        <thead className="h-11 rounded bg-blue-500 text-white">
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá (VND)</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders?.map((order, index) => (
                                <tr
                                    key={order?.id}
                                    className="cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                                >
                                    <td className="py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 text-center">
                                        {order?.name || '-'}
                                    </td>
                                    <td className="py-2 text-center">
                                        {order?.type || '-'}
                                    </td>
                                    <td className="py-2 text-center">
                                        {order?.quanity || '-'}
                                    </td>
                                    <td className="py-2 text-center">
                                        {order?.price || '-'}
                                    </td>
                                    <td className="py-2 text-center">
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
            </div>

            <div className="ml-4px float-right mt-8 flex w-1/2 flex-row pl-4">
                <div className="mr-[3%] flex basis-1/2 flex-col pl-[5%]">
                    <button className="btn btn-red btn-md w-full">
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span>Hủy</span>
                    </button>
                </div>
                <div className="ml-[3%] flex basis-1/2 flex-col pr-[5%]">
                    <button className="btn btn-blue btn-md w-full">
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
//
//
export default AddOrder;
