import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const userData = [
    {
        id: "1",
        name: "Bán hàng",
    },
    {
        id: "2",
        name: "Thống kê doanh thu",
    },
    {
        id: "3",
        name: "Thống kê hàng hóa",
    },
    {
        id: "4",
        name: "Quản lý nhân viên",
    },   
    {
        id: "5",
        name: "Quản lý khách hàng thân thiết",
    },
    {
        id: "6",
        name: "Duyệt đơn hàng",
    },  
    {
        id: "7",
        name: "Duyệt khách hàng thân thiết",
    },   
    {
        id: "8",
        name: "In hóa đơn",
    },
    {
        id: "9",
        name: "Quản lý quy định",
    },     
];

function AddRule () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    setUsers(userData);
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
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
        <div className="container text-lg h-[100%]  min-w-[790px]">
            <div className="flex flex-row">
                <div className="title m-auto">
                    <label className="text-4xl">
                        Thêm chức vụ
                    </label>
                </div>
            </div>
            
            <div className="flex flex-row mt-10 justify-center items-center">
                <div className="flex-col">
                    <label htmlFor="rule-name" className="text-3xl pr-5">Chức vụ:</label>
                </div>
                <div className="flex-col border-solib border-b-[1px] border-stone-900">
                    <input type="text" id="rule-name" className="text-input text-2xl border-none text-blue-500 " placeholder="Tên chức vụ"/>
                </div>
            </div>

            <div className="flex flex-row justify-center mt-5">
                <form className="form !h-[400px] overflow-y-scroll w-[80%] m-auto rounded-xl border border-gray-300 px-10 py-3 text-lg">
                {users.map((user, index) => (
                    <div className="py-3 text-left check-form cursor-pointer border-b border-slate-300 hover:bg-slate-100" key={index}>
                        <input
                            type="checkbox"
                            className="form-check-input mr-10"
                            id={user.id}
                            name={user.name}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                        />

                        <label htmlFor={user.id} className="form-check-label">{user.name}</label>
                    </div>
                    ))}
                
                    {/* check all */}
                </form>
            </div>

            <div className="flex flex-row mt-[5%] text-xl">
                <div className="flex-col w-1/2 ml-[10%] px-3">
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
                    <label htmlFor="checkall" className="form-check-label">Chọn tất cả</label>
                </div>

                <div className="flex-col w-1/2 mr-[10%]">
                    <Link to={"/rules"} className="float-left btn btn-red btn-md w-1/3">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span className="text-lg">Hủy</span>
                    </Link>

                    <button className="float-right btn btn-green btn-md w-1/3">
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
