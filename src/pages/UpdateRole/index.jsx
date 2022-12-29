import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const tmp = [
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

const validationSchema = Yup.object({
    name: Yup.string().required('Trường này bắt buộc'),
    price: Yup.number().required('Trường này bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    quantity: Yup.number().required('Trường này bắt buộc').min(1, 'Số lượng phải lớn hơn 0'),
    type: Yup.string().required('Trường này bắt buộc'),
});

function UpdateRole() {
    function handleFormsubmit(values) {
        setLoading(true);

        // Check values changed
        let reqValue = {};
        Object.keys(values).forEach((key) => {
            if (values[key] !== bacsicForm.initialValues[key]) {
                reqValue[key] = values[key];
            }
        });

        console.log(reqValue);

        // fetch('http://localhost:5000/api/product' + '/' + id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(reqValue),
        // })
        //     .then((res) => res.json())
        //     .then((resJson) => {
        //         if (resJson.success) {
        //             setLoading(false);
        //             showSuccessNoti();
        //             setTimeout(() => {
        //                 navigate('/product');
        //             }, 4000);
        //             //navigate('/product')
        //         } else {
        //             setLoading(false);
        //             showErorrNoti();
        //         }
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //         showErorrNoti();
        //     });
    }
    const [loading, setLoading] = useState(false);
    const showSuccessNoti = () => toast.info('Chỉnh sửa phẩm thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState([]);

    useEffect(() => {
        callApi();
    }, []);

    function callApi() {
        setRole(role);
        // fetch('http://localhost:5000/api/product' + '/' + id)
        //     .then((res) => res.json())
        //     .then((resJson) => {
        //         if (resJson.success) {
        //             setProduct(resJson.product);
        //         } else {
        //             setProduct({});
        //         }
        //     });
    }

    const bacsicForm = useFormik({
        initialValues: {
            id: role.id,
            name: role.name,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleFormsubmit,
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'allSelect') {
            let tempUser = role.map((user) => {
                return { ...user, isChecked: checked };
            });
            setRole(tempUser);
        } else {
            let tempUser = role.map((user) => (user.name === name ? { ...user, isChecked: checked } : user));
            setRole(tempUser);
        }
    };

    return (
        <div className="container min-w-[700px] text-lg">
            <div className="flex flex-row">
                <div className="title m-auto">
                    <label className="text-4xl">Thông tin chức vụ</label>
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

            <div className="mt-10 flex flex-row justify-center">
                <form className="form !h-[400px] w-[80%] overflow-y-scroll rounded-xl border border-gray-300 px-10 py-3 text-xl">
                    {role.map((user, index) => (
                        <div
                            className="check-form cursor-pointer border-b border-slate-300 py-3 text-left hover:bg-slate-100"
                            key={index}
                        >
                            <div className="!inline-block w-[10%]">
                                <input
                                    type="checkbox"
                                    className="form-check-input mr-10"
                                    id={user.id}
                                    name={user.name}
                                    checked={user?.isChecked || false}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="!inline-block w-[90%] flex-col">
                                <label htmlFor={user.id} className="form-check-label">
                                    {user.name}
                                </label>
                            </div>
                        </div>
                    ))}

                    {/* check all */}
                </form>
            </div>

            <div className="mt-6 flex flex-row text-xl">
                <div className="ml-[10%] !inline-block w-1/2 flex-col px-3">
                    <input
                        type="checkbox"
                        className="form-check-input mr-5"
                        name="allSelect"
                        id="checkall"
                        // checked={
                        //   role.filter((user) => user?.isChecked !== true).length < 1
                        // }
                        checked={!role.some((user) => user?.isChecked !== true)}
                        onChange={handleChange}
                    />
                    <label htmlFor="checkall" className="form-check-label">
                        Chọn tất cả
                    </label>
                </div>
            </div>

            <div className=" flex items-center justify-between border-t pt-6">
                <div
                    className={clsx('flex items-center text-blue-500', {
                        invisible: !loading,
                    })}
                >
                    <i className="fa-solid fa-spinner animate-spin text-lg"></i>
                    <span className="text-lx pl-3 font-medium">Đang chỉnh sửa sản phẩm</span>
                </div>
                <div className="flex">
                    <Link to={'/roles'} className="btn btn-red btn-md">
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span>Hủy</span>
                    </Link>
                    <button type="submit" className="btn btn-blue btn-md" disabled={!bacsicForm.dirty || loading}>
                        <span className="pr-2">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Lưu</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateRole;
