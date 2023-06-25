import { createRef, useState } from "react";

import logo from "../assets/logo.png";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const { setUser, setToken } = useStateContext();

    const emailRef = createRef();
    const passwordRef = createRef();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#cde9e4] h-screen">
                <div className="bg-white m-auto p-20 pl-40 pr-40 rounded-2xl mt-20">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm grow">
                        <img
                            className="mx-auto"
                            src={logo}
                            alt="Your Company"
                            width={100}
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-6 min-w-[400px]"
                            onSubmit={onSubmit}
                            method="POST"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    E-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10"
                                        ref={emailRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-semibold text-[#389d89] hover:text-[#66d9c2]"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10"
                                        ref={passwordRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#389d89] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#66d9c2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{" "}
                            <a
                                href="/signup"
                                className="font-semibold leading-6 text-[#389d89] hover:text-[#66d9c2]"
                            >
                                Sign up here!
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
