import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import TimeNow from '../../components/TimeNow';
import 'react-toastify/dist/ReactToastify.css';

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
            <div className="    flex  flex-col items-center justify-center md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white shadow    sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-2 p-3 sm:p-4 md:space-y-3">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
                            ĐĂNG KÝ TÀI KHOẢN
                        </h1>
                        <form className="space-y-1 md:space-y-2" onSubmit={bacsicForm.handleSubmit}>
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">
                                    Tên nhân viên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={clsx(
                                        'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900    sm:text-sm',
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
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 ">
                                    Địa chỉ email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className={clsx(
                                        'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900    sm:text-sm',
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
                            <div>
                                <label htmlFor="account" className="mb-2 block text-sm font-medium text-gray-900 ">
                                    Tài khoản
                                </label>
                                <input
                                    type="text"
                                    name="account"
                                    id="account"
                                    className={clsx(
                                        'focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900    sm:text-sm',
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

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 ">
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
                                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900     sm:text-sm"
                                />
                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.touched.password && bacsicForm.errors.password,
                                    })}
                                >
                                    {bacsicForm.errors.password || 'No message'}
                                </span>
                            </div>
                            <div>
                                <label htmlFor="RePassword" className="mb-2 block text-sm font-medium text-gray-900 ">
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
                                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900     sm:text-sm"
                                />
                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.touched.RePassword && bacsicForm.errors.RePassword,
                                    })}
                                >
                                    {bacsicForm.errors.RePassword || 'No message'}
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-blue focus:ring-primary-300  w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                            >
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCustomer;
