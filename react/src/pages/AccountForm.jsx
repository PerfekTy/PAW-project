import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import axiosClient from "../axios-client";

const AccountForm = () => {
    const { nickname } = useParams();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nickname: "",
        fullname: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (nickname) {
        useEffect(() => {
            axiosClient
                .get(`/account`)
                .then(({ data }) => {
                    setUser(data.data[0]);
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .put(`/account/${nickname}`, user)
            .then(() => {
                navigate("/account");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    }
                }
            });
    };

    return (
        <div className="flex flex-col items-center text-2xl w-1/3 mt-10 mx-auto">
            <p className="border-2 tracking-widest p-5 w-full text-center mb-10">
                Update user: {user.nickname}
            </p>
            <form className="text-lg flex flex-col w-full" onSubmit={onSubmit}>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <div className="flex w-full items-center justify-center mt-10">
                    <input
                        type="text"
                        className="border-2 outline-[#66d9c2] p-2 text-md w-1/2"
                        placeholder="Nickname"
                        onChange={(e) =>
                            setUser({ ...user, nickname: e.target.value })
                        }
                        value={user.nickname}
                    />
                </div>
                <div className="flex w-full items-center justify-center mt-10">
                    <input
                        type="text"
                        className="border-2 outline-[#66d9c2] p-2 text-md w-1/2"
                        placeholder="Full-name"
                        onChange={(e) =>
                            setUser({ ...user, fullname: e.target.value })
                        }
                        value={user.fullname}
                    />
                </div>
                <div className="flex w-full items-center justify-center mt-10">
                    <input
                        type="email"
                        className="border-2 outline-[#66d9c2] p-2 text-md w-1/2"
                        placeholder="E-mail"
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        value={user.email}
                    />
                </div>
                <div className="flex w-full items-center justify-center mt-10">
                    <input
                        type="password"
                        className="border-2 outline-[#66d9c2] p-2 text-md w-1/2"
                        placeholder="Password"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                </div>
                <div className="flex w-full items-center justify-center mt-10">
                    <input
                        type="password"
                        className="border-2 outline-[#66d9c2] p-2 text-md w-1/2"
                        placeholder="Password confirmation"
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password_confirmation: e.target.value,
                            })
                        }
                    />
                </div>
                <input
                    type="submit"
                    className="bg-[#66d9c2] mx-auto mt-10 p-2 px-10 rounded-md cursor-pointer w-1/2"
                    value="Update"
                />
            </form>
        </div>
    );
};

export default AccountForm;
