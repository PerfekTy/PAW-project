import { createRef, useState } from "react";
import logo from "../assets/logo.png";

import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
    const nickNameRef = createRef(),
        fullNameRef = createRef(),
        emailRef = createRef(),
        genderRef = createRef(),
        passwordRef = createRef(),
        passwordCRef = createRef(),
        { setUser, setToken } = useStateContext(),
        [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            nickname: nickNameRef.current.value,
            fullname: fullNameRef.current.value,
            email: emailRef.current.value,
            gender: genderRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordCRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 grow h-screen bg-[#cde9e4] ">
                <div className="bg-white m-auto p-10 pl-40 pr-40 rounded-2xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm grow">
                        <img
                            className="mx-auto"
                            src={logo}
                            alt="Your Company"
                            width={100}
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up to your account
                        </h2>
                    </div>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm min-w-[400px]">
                        <form
                            className="space-y-6"
                            onSubmit={onSubmit}
                            method="POST"
                        >
                            <div>
                                <label
                                    htmlFor="nickname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Nickname
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nickname"
                                        name="nickname"
                                        type="text"
                                        autoComplete="nickname"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10"
                                        ref={nickNameRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="fullname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Full name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        autoComplete="fullname"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10"
                                        ref={fullNameRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        E-mail
                                    </label>
                                </div>
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
                                        htmlFor=""
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Gender
                                    </label>
                                </div>
                                <select
                                    className="w-full outline-[#66d9c2] ring-1 ring-inset ring-gray-300 p-2 rounded-lg"
                                    ref={genderRef}
                                >
                                    <option value="male" key="1">
                                        Male
                                    </option>
                                    <option value="female" key="2">
                                        Female
                                    </option>
                                    <option value="other" key="3">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
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
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password confirmation
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:[#66d9c2] outline-[#66d9c2] sm:text-lg sm:leading-6 pl-2 h-10"
                                        ref={passwordCRef}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#389d89] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#66d9c2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{" "}
                            <a
                                href="/login"
                                className="font-semibold leading-6  text-[#389d89] hover:text-[#66d9c2]"
                            >
                                Sign in here!
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
