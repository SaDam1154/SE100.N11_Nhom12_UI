import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

import clsx from 'clsx';

const validationSchema = Yup.object({
    account: Yup.string().required('Vui lòng nhập tên tài tài khoản!'),
    password: Yup.string().required('Vui lòng nhập nhập mật khẩu!'),
});

function Login() {
    const bacsicForm = useFormik({
        initialValues: {
            account: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
    });
    function handleFormsubmit() {
        console.log(bacsicForm.values);
    }
    return (
        <div>
            <section className="bg-gray-200 ">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <a href="#" className="mb-6 flex items-center text-2xl font-semibold text-green-600 ">
                        <img
                            className="mr-2 h-8 w-8"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        CỬA HÀNG CÂY XANH
                    </a>
                    <div className="w-full rounded-lg bg-white shadow    sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
                                Đăng nhập
                            </h1>
                            <form className="space-y-1 md:space-y-2" onSubmit={bacsicForm.handleSubmit}>
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

                                <button
                                    type="submit"
                                    className="btn btn-blue focus:ring-primary-300  w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                                >
                                    Đăng nhập
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
