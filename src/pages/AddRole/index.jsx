import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const functions = [
    {
        _id: 1,
        name: 'product/read',
        displayName: 'Xem sản phẩm',
        index: '101',
    },
    {
        _id: 2,
        name: 'product/add',
        displayName: 'Thêm sản phẩm',
        index: '102',
    },
    {
        _id: 3,
        name: 'product/update',
        displayName: 'Sửa sản phẩm',
        index: '103',
    },

    {
        _id: 4,
        name: 'customer/read',
        displayName: 'Xem khách hàng',
        index: '101',
    },
    {
        _id: 5,
        name: 'customer/add',
        displayName: 'Thêm khách hàng',
        index: '102',
    },
    {
        _id: 6,
        name: 'customer/update',
        displayName: 'Sửa khách hàng',
        index: '103',
    },
];

function AddRole() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(functions);
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'allSelect') {
            let tempUser = users.map((user) => {
                return { ...user, isChecked: checked };
            });
            setUsers(tempUser);
        } else {
            let tempUser = users.map((user) => (user.name === name ? { ...user, isChecked: checked } : user));
            setUsers(tempUser);
        }
    };

    return (
        <div className="container h-[100%] min-w-[790px]  text-lg">
            <div className="flex flex-row">
                <div className="title m-auto">
                    <label className="text-4xl">Thêm chức vụ</label>
                </div>
            </div>

            <div className="mt-10 flex flex-row items-center justify-center">
                <div className="flex-col">
                    <label htmlFor="role-name" className="pr-5 text-3xl">
                        Chức vụ:
                    </label>
                </div>
                <div className="border-solib flex-col border-b-[1px] border-stone-900">
                    <input
                        type="text"
                        id="role-name"
                        className="text-input border-none text-2xl text-blue-500 "
                        placeholder="Tên chức vụ"
                    />
                </div>
            </div>

            <div className="mt-5 flex flex-row justify-center">
                <form className="form m-auto !h-[400px] w-[80%] overflow-y-scroll rounded-xl border border-gray-300 px-10 py-3 text-lg">
                    {users.map((user, index) => (
                        <div
                            className="check-form cursor-pointer border-b border-slate-300 py-3 text-left hover:bg-slate-100"
                            key={index}
                        >
                            <input
                                type="checkbox"
                                className="form-check-input mr-10"
                                id={user._id}
                                name={user.displayName}
                                checked={user?.isChecked || false}
                                onChange={handleChange}
                            />

                            <label htmlFor={user._id} className="form-check-label">
                                {user.displayName}
                            </label>
                        </div>
                    ))}

                    {/* check all */}
                </form>
            </div>

            <div className="mt-[5%] flex flex-row text-xl">
                <div className="ml-[10%] w-1/2 flex-col px-3">
                    <input
                        type="checkbox"
                        className="form-check-input mr-5"
                        name="allSelect"
                        id="checkall"
                        // checked={
                        //   users.filter((user) => user?.isChecked !== true).length < 1
                        // }
                        checked={!users.some((user) => user?.isChecked !== true)}
                        onChange={handleChange}
                    />
                    <label htmlFor="checkall" className="form-check-label">
                        Chọn tất cả
                    </label>
                </div>

                <div className="mr-[10%] w-1/2 flex-col">
                    <Link to={'/role'} className="btn btn-red btn-md float-left w-1/3">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span className="text-lg">Hủy</span>
                    </Link>

                    <button className="btn btn-green btn-md float-right w-1/3">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span className="text-lg">Thêm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddRole;
