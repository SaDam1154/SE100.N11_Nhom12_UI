import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import TimeNow from '../../components/TimeNow';
import 'react-toastify/dist/ReactToastify.css';

import AccountRule from '../../components/AccountRule';

const validationSchema = Yup.object({
    account: Yup.string().required('Vui lòng nhập tên tài tài khoản!'),
    password: Yup.string().required('Vui lòng nhập nhập mật khẩu!'),
    RePassword: Yup.string().required('Vui lòng nhập nhập lại mật khẩu!'),
});

function AddCustomer() {
    const [loading, setLoading] = useState(false);
    const showSuccessNoti = () => toast.info('Thêm thông tin khách hàng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');

    const bacsicForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            account: '',
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
    });

    const navigate = useNavigate();

    function handleFormsubmit(values) {
        console.log(values);
        setLoading(true);
        fetch('http://localhost:5000/api/customer', {
            method: 'POST',
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
                    bacsicForm.resetForm();
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
                        {/* <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
                            ĐĂNG KÝ TÀI KHOẢN
                        </h1> */}
                        <div className="mt-4 flex">
                            <div className="mr-8 flex w-1/2 flex-col space-y-2 text-lg">
                                <div className="form-group flex flex-col ">
                                    <label htmlFor="name" className="mb-1 select-none  font-semibold text-gray-900  ">
                                        Tên nhân viên
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={clsx(
                                            'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300  p-2.5 text-gray-900    sm:text-sm',
                                            {
                                                invalid: bacsicForm.touched.name && bacsicForm.errors.name,
                                            }
                                        )}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.name}
                                        placeholder="Tên tài khoản"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.touched.name && bacsicForm.errors.name,
                                        })}
                                    >
                                        {bacsicForm.errors.name || 'No message'}
                                    </span>
                                </div>
                                <div className="form-group flex flex-col">
                                    <label htmlFor="email" className="mb-1 select-none  font-semibold text-gray-900  ">
                                        Địa chỉ email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className={clsx(
                                            'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300  p-2.5 text-gray-900    sm:text-sm',
                                            {
                                                invalid: bacsicForm.touched.email && bacsicForm.errors.email,
                                            }
                                        )}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.email}
                                        placeholder="Tên tài khoản"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.touched.email && bacsicForm.errors.email,
                                        })}
                                    >
                                        {bacsicForm.errors.email || 'No message'}
                                    </span>
                                </div>
                                <div className="form-group flex flex-col">
                                    <label className="mb-1 select-none  font-semibold text-gray-900 " htmlFor="type">
                                        Chức vụ
                                    </label>

                                    <AccountRule
                                        id="type"
                                        className={clsx('text-input cursor-pointer py-[5px]', {
                                            invalid: bacsicForm.touched.type && bacsicForm.errors.type,
                                        })}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.type}
                                        name="type"
                                    />

                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.touched.type && bacsicForm.errors.type,
                                        })}
                                    >
                                        {bacsicForm.errors.type || 'No message'}
                                    </span>
                                </div>
                            </div>
                            <div className="mr-8 flex w-1/2 flex-col space-y-2 text-lg">
                                <div className="form-group flex flex-col ">
                                    <label
                                        htmlFor="account"
                                        className="mb-1 select-none  font-semibold text-gray-900  "
                                    >
                                        Tài khoản
                                    </label>
                                    <input
                                        type="text"
                                        name="account"
                                        id="account"
                                        className={clsx(
                                            'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300  p-2.5 text-gray-900    sm:text-sm',
                                            {
                                                invalid: bacsicForm.touched.account && bacsicForm.errors.account,
                                            }
                                        )}
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.account}
                                        placeholder="Tên tài khoản"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.touched.account && bacsicForm.errors.account,
                                        })}
                                    >
                                        {bacsicForm.errors.account || 'No message'}
                                    </span>
                                </div>

                                <div className="form-group flex flex-col ">
                                    <label
                                        htmlFor="password"
                                        className="mb-1 select-none  font-semibold text-gray-900  "
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.password}
                                        placeholder="Mật khẩu của bạn"
                                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300  p-2.5 text-gray-900     sm:text-sm"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100': bacsicForm.touched.password && bacsicForm.errors.password,
                                        })}
                                    >
                                        {bacsicForm.errors.password || 'No message'}
                                    </span>
                                </div>
                                <div className="form-group flex flex-col ">
                                    <label
                                        htmlFor="RePassword"
                                        className="mb-1 select-none  font-semibold text-gray-900  "
                                    >
                                        Nhập lại mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        name="RePassword"
                                        id="RePassword"
                                        onChange={bacsicForm.handleChange}
                                        onBlur={bacsicForm.handleBlur}
                                        value={bacsicForm.values.RePassword}
                                        placeholder="Nhập lại mật khẩu của bạn"
                                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300  p-2.5 text-gray-900     sm:text-sm"
                                    />
                                    <span
                                        className={clsx('text-sm text-red-500 opacity-0', {
                                            'opacity-100':
                                                bacsicForm.touched.RePassword && bacsicForm.errors.RePassword,
                                        })}
                                    >
                                        {bacsicForm.errors.RePassword || 'No message'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex">
                            <div className="form-group mr-4 mt-3 flex basis-1/2 flex-col ">
                                <label className="mb-1 cursor-default select-none text-lg font-semibold">
                                    Ngày thêm
                                </label>
                                <div className="rounded border border-slate-300 bg-slate-50 px-2 outline-none">
                                    <TimeNow />
                                </div>
                            </div>
                            {/* PRICE */}
                        </div>
                        <div className="mt-6 flex items-center justify-between border-t pt-6">
                            <div
                                className={clsx('flex items-center text-blue-500', {
                                    invisible: !loading,
                                })}
                            >
                                <i className="fa-solid fa-spinner animate-spin text-xl"></i>
                                <span className="text-lx pl-3 font-medium">Đang tạo sản phẩm</span>
                            </div>
                            <div className="flex">
                                <Link to={'/product'} className="btn btn-red btn-md">
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
            <ToastContainer hideProgressBar />
        </>
    );
}

export default AddCustomer;