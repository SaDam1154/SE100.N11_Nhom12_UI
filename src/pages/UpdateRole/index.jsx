import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function UpdateRole() {
    const [selectedFunctionIds, setSelectedFunctionIds] = useState([1, 3, 5]);
    const [FUNCTIONS, setFunctions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/function')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setFunctions(resJson.functions);
                } else {
                    setFunctions([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const [checkAll, setCheckAll] = useState(false);

    function isChecked(id) {
        return selectedFunctionIds.includes(id);
    }

    function handleToggleCheckAll(e) {
        setCheckAll(e.target.checked);
        if (e.target.checked) {
            setSelectedFunctionIds(FUNCTIONS.map((func) => func._id));
        } else {
            setSelectedFunctionIds([]);
        }
    }

    function handleToggleFunc(id) {
        if (isChecked(id)) {
            // checked --> not checked
            setCheckAll(false);
            const tempArray = [...selectedFunctionIds];
            const index = tempArray.indexOf(id);
            if (index > -1) {
                tempArray.splice(index, 1);
            }
            setSelectedFunctionIds(tempArray);
        } else {
            // not checked --> checked
            if (selectedFunctionIds.length === FUNCTIONS.length - 1) {
                setCheckAll(true);
            }
            setSelectedFunctionIds([...selectedFunctionIds, id]);
        }
    }

    return (
        <div className="container h-[100%] min-w-[790px]">
            <div className="mx-auto max-w-[800px]">
                <div className="mt-5 flex items-center justify-center space-x-4">
                    <div className="w-[300px]">
                        <label htmlFor="role-name" className="mb-2 inline-block font-semibold">
                            Chức vụ:
                        </label>
                        <input
                            type="text"
                            id="role-name"
                            className="text-input w-full py-2"
                            placeholder="Tên chức vụ"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="role-description" className="mb-2 inline-block font-semibold">
                            Mô tả chức vụ:
                        </label>
                        <input
                            type="text"
                            id="role-description"
                            className="text-input w-full py-2"
                            placeholder="Tên chức vụ"
                        />
                    </div>
                </div>

                <div className="mt-5 flex flex-row justify-center">
                    <div className="m-auto !h-[400px] w-full overflow-y-scroll rounded border border-gray-300 px-5 py-5 text-lg">
                        {FUNCTIONS.map((func, index) => (
                            <div
                                className="flex cursor-pointer items-center border-b border-slate-300 px-2 hover:bg-slate-100"
                                key={index}
                            >
                                <input
                                    type="checkbox"
                                    className="accent-blue-500"
                                    id={'function-input-' + func._id}
                                    name={func.displayName}
                                    checked={isChecked(func._id)}
                                    onChange={() => handleToggleFunc(func._id)}
                                />

                                <label htmlFor={'function-input-' + func._id} className="block flex-1 py-3 pl-8 ">
                                    {func.displayName}
                                </label>
                            </div>
                        ))}

                        {/* check all */}
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <div className="flex cursor-pointer items-center text-lg">
                        <input
                            type="checkbox"
                            className="accent-blue-500"
                            id="checkall"
                            checked={checkAll}
                            onChange={handleToggleCheckAll}
                        />
                        <label htmlFor="checkall" className="inline-block py-3 pl-5">
                            Chọn tất cả
                        </label>
                    </div>

                    <div className="flex">
                        <Link to={'/role'} className="btn btn-red btn-md">
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span className="">Hủy</span>
                        </Link>

                        <button className="btn btn-green btn-md">
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span className="">Thêm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateRole;
