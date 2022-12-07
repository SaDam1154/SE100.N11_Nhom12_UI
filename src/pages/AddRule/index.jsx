import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const userData = [
    {
        id: '1',
        name: 'Bán hàng',
    },
    {
        id: '2',
        name: 'Thống kê doanh thu',
    },
    {
        id: '3',
        name: 'Thống kê hàng hóa',
    },
    {
        id: '4',
        name: 'Quản lý nhân viên',
    },
    {
        id: '5',
        name: 'Quản lý khách hàng thân thiết',
    },
    {
        id: '6',
        name: 'Duyệt đơn hàng',
    },
    {
        id: '7',
        name: 'Duyệt khách hàng thân thiết',
    },
    {
        id: '8',
        name: 'In hóa đơn',
    },
    {
        id: '9',
        name: 'Quản lý quy định',
    },
];

function AddRule() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(userData);
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'allSelect') {
            let tempUser = users.map((user) => {
                return { ...user, isChecked: checked };
            });
            setUsers(tempUser);
        } else {
            let tempUser = users.map((user) =>
                user.name === name ? { ...user, isChecked: checked } : user
            );
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
                    <label htmlFor="rule-name" className="pr-5 text-3xl">
                        Chức vụ:
                    </label>
                </div>
                <div className="border-solib flex-col border-b-[1px] border-stone-900">
                    <input
                        type="text"
                        id="rule-name"
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
                                id={user.id}
                                name={user.name}
                                checked={user?.isChecked || false}
                                onChange={handleChange}
                            />

                            <label
                                htmlFor={user.id}
                                className="form-check-label"
                            >
                                {user.name}
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
                        checked={
                            !users.some((user) => user?.isChecked !== true)
                        }
                        onChange={handleChange}
                    />
                    <label htmlFor="checkall" className="form-check-label">
                        Chọn tất cả
                    </label>
                </div>

                <div className="mr-[10%] w-1/2 flex-col">
                    <Link
                        to={'/rules'}
                        className="btn btn-red btn-md float-left w-1/3"
                    >
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

export default AddRule;
