import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import TimeNow from '../../components/TimeNow';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Trường này bắt buộc')
        .min(2, 'Tên phải có độ dài hơn 2 kí tự')
        .max(30, 'Tên dài tối đa 30 kí tự'),
    address: Yup.string().required('Trường này bắt buộc'),
    phone: Yup.string()
        .required('Trường này bắt buộc')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Số điện thoại phải là số từ 10 số'),
});

function UpdateCustomer() {
    const [loading, setLoading] = useState(false);
    const showSuccessNoti = () => toast.info('Chỉnh sửa thông tin khách hàng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    useEffect(() => {
        callApi();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/customer' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setCustomer(resJson.customer);
                } else {
                    setCustomer({});
                }
            });
    }
    // const hihihaha= customer.name
    const bacsicForm = useFormik({
        initialValues: {
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleFormsubmit,
    });
    const navigate = useNavigate();
    // const currentPromise = new Promise((resolve, reject) => {
    //     setTimeout (() => {
    //         resolve('/customers')
    //     },5000)
    // })
    function handleFormsubmit(values) {
        console.log(values);
        setLoading(true);
        fetch('http://localhost:5000/api/customer/'+ id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setLoading(false);
                    showSuccessNoti();
                    setTimeout(() => {
                        navigate('/customers')
                    }, 4000);
                } else {
                    setLoading(false);
                    showErorrNoti();
                }
            })
            .catch(() => {
                setLoading(false);
                showErorrNoti();
            });
    }
    return (
        <>
            <div className="container">
                <div className="w-full">
                    <form onSubmit={bacsicForm.handleSubmit}>
                    <div className="flex flex-row mt-4">
                        <div className="basis-1/2 flex flex-col mt-[4%]" >
                            <label className="font-semibold mb-1">Mã khách hàng</label>
                            <div className="border h-10  border-gray-300 bg-gray-400 px-2 py-1 opacity-70 rounded-lg text-xl">
                                {customer._id}
                            </div>
                        </div>
                    </div>

                        <div className="mt-4 flex">
                            {/* Name */}
                            <div className="mr-8 flex w-1/2 flex-col space-y-2 text-lg">
                                <div className="form-group flex flex-col ">
                                    <label
                                        className="mb-1 font-semibold"
                                        htmlFor="name"
                                    >
                                        Tên khách hàng
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={clsx('text-input py-[5px]', {
                                            invalid:
                                                bacsicForm.touched.name &&
                                                bacsicForm.errors.name,
                                        })}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.name}
                                        name="name"
                                        placeholder='Nguyễn Văn A'
                                    />
                                    <span
                                        className={clsx(
                                            'text-sm text-red-500 opacity-0',
                                            {
                                                'opacity-100':
                                                    bacsicForm.touched.name &&
                                                    bacsicForm.errors.name,
                                            }
                                        )}
                                    >
                                        {bacsicForm.errors.name || 'No message'}
                                    </span>
                                </div>

                                <div className="form-group flex flex-col">
                                    <label
                                        className="mb-1 font-semibold"
                                        htmlFor="phone"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className={clsx(
                                            'text-input w-full py-[5px]',
                                            {
                                                invalid:
                                                    bacsicForm.touched.phone &&
                                                    bacsicForm.errors.phone,
                                            }
                                        )}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.phone}
                                        name="phone"
                                        placeholder="0987654321"
                                    />
                                    <span
                                        className={clsx(
                                            'text-sm text-red-500 opacity-0',
                                            {
                                                'opacity-100':
                                                    bacsicForm.touched.phone &&
                                                    bacsicForm.errors.phone,
                                            }
                                        )}
                                    >
                                        {bacsicForm.errors.phone ||
                                            'No message'}
                                    </span>
                                </div>

                                <div className="form-group flex basis-1/2 flex-col ">
                                <label htmlFor='date' className="mb-1 cursor-default text-lg font-semibold">
                                    Ngày chỉnh sửa
                                </label>
                                <div className="text-input">
                                    <TimeNow />
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* DATE AND PRICE */}
                        <div className="mt-4 flex">
                            <div className="mt-3 flex w-full flex-col">
                                <label
                                    className="mb-1 text-lg font-semibold"
                                    htmlFor="address"
                                >
                                    Địa chỉ
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="address"
                                        className={clsx(
                                            'text-input w-full py-[5px]',
                                            {
                                                invalid:
                                                    bacsicForm.touched.address &&
                                                    bacsicForm.errors.address,
                                            }
                                        )}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.address}
                                        name="address"
                                        placeholder="Nhập địa chỉ khách hàng"
                                    />
                                </div>
                                <span
                                    className={clsx(
                                        'text-sm text-red-500 opacity-0',
                                        {
                                            'opacity-100':
                                                bacsicForm.touched.address &&
                                                bacsicForm.errors.address,
                                        }
                                    )}
                                >
                                    {bacsicForm.errors.address || 'No message'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t pt-6">
                            <div
                                className={clsx(
                                    'flex items-center text-blue-500',
                                    {
                                        invisible: !loading,
                                    }
                                )}
                            >
                                <i className="fa-solid fa-spinner animate-spin text-xl"></i>
                                <span className="text-lx pl-3 font-medium">
                                    Đang tạo thông tin khách hàng
                                </span>
                            </div>
                            <div className="flex">
                                <Link
                                    to={'/customers'}
                                    className="btn btn-red btn-md"
                                >
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </span>
                                    <span>Hủy</span>
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-blue btn-md"
                                    disabled={!bacsicForm.dirty || loading}
                                >
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </span>
                                    <span>Thêm</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default UpdateCustomer;