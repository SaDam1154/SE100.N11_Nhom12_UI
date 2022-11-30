import { useEffect, useState } from "react";

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
        name: "QUản lý nhân viên basn han",
    },   
    {
        id: "5",
        name: "Thống kê hàng hóa da bans",
    },
    {
        id: "6",
        name: "QUản lý nhân viêndd",
    },  
    {
        id: "7",
        name: "QUản lý nhân viên basn handdd",
    },   
    {
        id: "8",
        name: "Thống kê hàng hóa da bandds",
    },
    {
        id: "9",
        name: "QUản lý nhân viênddd",
    },    
];

function UpdateRule () {
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
        <div className="container text-lg min-w-[700px]">
            <div className="flex flex-row">
                <div className="title m-auto">
                    <label className="text-4xl">
                        Thông tin chức vụ
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

            <div className="flex flex-row justify-center mt-10">
                <form className="form w-[80%] !h-[400px] overflow-y-scroll rounded-xl border border-gray-300 px-10 py-3 text-xl">
                {users.map((user, index) => (
                    <div className="py-3 text-left check-form cursor-pointer border-b border-slate-300 hover:bg-slate-100" key={index}>
                        <div className="w-[10%] !inline-block">
                        <input
                            type="checkbox"
                            className="form-check-input mr-10"
                            id={user.id}
                            name={user.name}
                            checked={user?.isChecked || false}
                            onChange={handleChange}
                        />
                        </div>
                        
                        <div className="flex-col w-[90%] !inline-block">
                            <label htmlFor={user.id} className="form-check-label">{user.name}</label>
                        </div>
                    </div>
                    ))}
                
                    {/* check all */}
                </form>
            </div>

            <div className="flex flex-row mt-6 text-xl">
                <div className="!inline-block flex-col w-1/2 ml-[10%] px-3">
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

                <div className="flex-row w-2/3 mr-[10%]">
                    <button className="!inline-block flex-col float-left btn btn-blue btn-md w-[40%]">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span className="text-lg">Quay lại</span>
                    </button>
                    <button className="!inline-block flex-col float-right btn btn-green btn-md w-[40%]">
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

export default UpdateRule;