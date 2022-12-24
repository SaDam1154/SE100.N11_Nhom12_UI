function Login() {
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
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="mb-2 block text-sm font-medium text-gray-900 ">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900    sm:text-sm"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label for="password" className="mb-2 block text-sm font-medium text-gray-900 ">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900     sm:text-sm"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="focus:ring-3 focus:ring-primary-300  h-4 w-4 rounded border border-gray-300 bg-gray-50  "
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 ">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-primary-600  text-sm font-medium hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-blue focus:ring-primary-300  w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                                >
                                    Sign in
                                </button>
                                <div class="space-x-2 py-6">
                                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-lg font-bold">
                                        f
                                    </span>
                                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-lg font-bold">
                                        G+
                                    </span>
                                    <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-lg font-bold">
                                        in
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
