import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Customers() {
    // const [search, setSearch] = useState('');
    // onChange={(e) => {
    //     setSearch(e.target.value);
    // }}
    // .filter((product) => {
    //     return search.toLowerCase() === ''
    //         ? product
    //         : product.name
    //               .toLowerCase()
    //               .includes(search) ||
    //               product?.type.name
    //                   .toLowerCase()
    //                   .includes(search);
    // })
    const [search, setSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/customer')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setCustomers(resJson.customers);
                } else {
                    setCustomers([]);
                }
            });
    }, []);
    function LinkToDetail(id) {
        navigate('/customer/detail/' + id);
    }
    return (
        <div>
            <div className="flex space-x-4">
                {/* tite + reload btn */}
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">Danh sách khách hàng</label>
                    <button type="button" className="ml-3 text-gray-800 hover:underline">
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
                            placeholder="Tìm kiếm khách hàng"
                        />
                    </div>

                    <Link to="/customer/add" className="btn btn-md bg-green-600 hover:bg-green-500">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm khách hàng</span>
                    </Link>
                </div>
            </div>
            <table className="mt-4 w-full">
                <colgroup>
                    <col span="1" style={{ width: '10%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '20%' }} />
                    <col span="1" style={{ width: '10%' }} />
                </colgroup>

                <thead className="h-11 rounded bg-blue-500 text-white">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã KH</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ </th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {customers
                        .filter((customer) => {
                            return search.toLowerCase() === ''
                                ? customer
                                : customer.name.toLowerCase().includes(search) ||
                                      customer.phone.toLowerCase().includes(search);
                        })
                        ?.map((customer, index) => (
                            <tr
                                key={customer._id}
                                className="cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                            >
                                <td className="py-2 text-center" onClick={() => LinkToDetail(customer.id)}>
                                    {index + 1}
                                </td>
                                <td className="py-2 text-left" onClick={() => LinkToDetail(customer.id)}>
                                    {customer._id}
                                </td>
                                <td className="py-2 pl-[4%] text-left" onClick={() => LinkToDetail(customer.id)}>
                                    {customer.name}
                                </td>
                                <td className="py-2 text-center" onClick={() => LinkToDetail(customer.id)}>
                                    {customer.phone}
                                </td>
                                <td className="py-2 pl-4 text-left" onClick={() => LinkToDetail(customer.id)}>
                                    {customer.address}
                                </td>
                                <td className="py-2 text-center">
                                    <div className="flex justify-end">
                                        <Link
                                            to={'/customer/update/' + customer.id}
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-400"
                                        >
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </Link>
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

export default Customers;
