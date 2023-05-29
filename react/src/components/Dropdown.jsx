import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import other from "../assets/other_img.png";
import male from "../assets/male_img.svg";
import female from "../assets/female_img.png";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
    const { user, setUser, setToken } = useStateContext();
    const [avatar, _setAvatar] = useState(null);

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
            if (data.gender === "male") {
                _setAvatar(male);
            } else if (data.gender === "female") {
                _setAvatar(female);
            } else if (data.gender === "other") {
                _setAvatar(other);
            }
        });
    }, []);

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient
            .post("/logout")
            .then(() => {
                setUser({});
                setToken(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#ffffff] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#ffffffb3] items-center">
                    {user.nickname && avatar ? (
                        <>
                            <img src={avatar} alt="" width={40} />
                            <p className="text-[16px]">{user.nickname}</p>
                        </>
                    ) : (
                        <Loading />
                    )}
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full p-1 text-center text-sm"
                                    )}
                                >
                                    My wardrobe
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="/account"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full p-1 text-center text-sm"
                                    )}
                                >
                                    Account
                                </a>
                            )}
                        </Menu.Item>
                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block w-full p-1 text-center text-sm"
                                        )}
                                        onClick={onLogout}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
