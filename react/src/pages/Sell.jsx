import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import clothLogo from "../assets/cloth.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sell = () => {
    const user_nickname = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <FaChevronLeft color="#000" />,
        nextArrow: <FaChevronRight color="#000" />,
    };

    const [cloth, setCloth] = useState({
        name: "",
        brand: "",
        price: "",
        size: "",
        gender: "",
        description: "",
        nickname: user_nickname.nickname,
        id: "",
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const { setNotification } = useStateContext();
    const [errors, setErrors] = useState(null);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);

        files.forEach((file) => {
            setSelectedFiles((prevSelectedFiles) => [
                ...prevSelectedFiles,
                file,
            ]);
        });
    };

    const onSubmitPhoto = (e) => {
        e.preventDefault();
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files[]", file);
            formData.append("id", cloth.id);
        });

        axiosClient
            .post("/upload", formData)
            .then(() => {
                navigate("/home");
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

    const onSubmitCloth = (e) => {
        e.preventDefault();

        axiosClient
            .post("/sell", cloth)
            .then(({ data }) => {
                const clothId = data.cloth.id;
                setCloth({
                    ...cloth,
                    id: clothId,
                });

                setNotification("Cloth was successfully added");
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
        <div>
            <div className="my-10 mb-10 flex flex-col items-center">
                <img src={clothLogo} alt="clothlogo" width={170} />
                <h1 className="text-2xl mt-5">
                    <span className="text-[red]">Attention!</span> First add
                    your Cloth then Photos!
                </h1>
            </div>
            {errors && (
                <p className="alert w-1/4 mb-10">
                    {errors && <p>{errors.price}</p>}
                    {errors && <p>{errors.gender}</p>}
                    {errors && <p>{errors.size}</p>}
                </p>
            )}

            <div className="flex justify-center gap-40">
                <form className="w-[400px]" onSubmit={onSubmitCloth}>
                    <div className="flex w-full items-center justify-center relative">
                        <label
                            htmlFor="cloth"
                            className="absolute -top-5 text-sm left-0"
                        >
                            Cloth Name
                        </label>
                        <p className="-top-5 right-0 absolute text-[14px] text-[red]">
                            {errors && errors.name}
                        </p>
                        <input
                            type="text"
                            id="cloth"
                            className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                            placeholder="🖊️"
                            onChange={(e) =>
                                setCloth({
                                    ...cloth,
                                    name: e.target.value,
                                })
                            }
                            value={cloth.name}
                        />
                    </div>
                    <div className="flex w-full items-center justify-center mt-10 relative">
                        <label
                            htmlFor="brand"
                            className="absolute -top-5 text-sm left-0"
                        >
                            Cloth Brand
                        </label>
                        <p className="-top-5 right-0 absolute text-[14px] text-[red]">
                            {errors && errors.brand}
                        </p>
                        <input
                            placeholder="👚"
                            className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                            id="brand"
                            onChange={(e) =>
                                setCloth({
                                    ...cloth,
                                    brand: e.target.value,
                                })
                            }
                            value={cloth.brand}
                        />
                    </div>
                    <div className="flex gap-2 pb-5">
                        <div className="flex w-full items-center justify-center mt-10 relative">
                            <label
                                htmlFor="price"
                                className="absolute -top-5 text-sm left-0"
                            >
                                Cloth Price
                            </label>
                            <input
                                placeholder="💲"
                                className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                                id="price"
                                onChange={(e) =>
                                    setCloth({
                                        ...cloth,
                                        price: e.target.value,
                                    })
                                }
                                value={cloth.price}
                            />
                        </div>
                        <div className="flex w-full items-center justify-center mt-10 relative">
                            <label
                                htmlFor="sex"
                                className="absolute -top-5 text-sm left-0"
                            >
                                Cloth sex
                            </label>
                            <select
                                onChange={(e) =>
                                    setCloth({
                                        ...cloth,
                                        gender: e.target.value,
                                    })
                                }
                                className="w-full outline-[#66d9c2] border-2 ring-inset ring-gray-300 p-2"
                            >
                                <option value="Sex" disabled selected>
                                    👦👧
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </div>
                        <div className="flex w-full items-center justify-center mt-10 relative">
                            <label
                                htmlFor="size"
                                className="absolute -top-5 text-sm left-0"
                            >
                                Cloth Size
                            </label>

                            <select
                                onChange={(e) =>
                                    setCloth({
                                        ...cloth,
                                        size: e.target.value,
                                    })
                                }
                                className="w-full outline-[#66d9c2] border-2 ring-inset ring-gray-300 p-2"
                                defaultValue="size"
                            >
                                <option value="size" disabled selected>
                                    🔍
                                </option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex w-full flex-col items-center justify-center mt-5 relative">
                        <label
                            htmlFor="size"
                            className="absolute -top-5 text-sm left-0"
                        >
                            Cloth description
                        </label>
                        <p className="-top-5 right-0 absolute text-[14px] text-[red]">
                            {errors && errors.description}
                        </p>
                        <textarea
                            placeholder="ex. Brand new, almost no damages, if you're interested text me."
                            cols="30"
                            rows="10"
                            className="w-full outline-[#66d9c2] border-2 ring-inset ring-gray-300 p-2"
                            onChange={(e) =>
                                setCloth({
                                    ...cloth,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                        <input
                            type="submit"
                            className="bg-[#66d9c2] hover:bg-[#4aa996] text-black mt-5 w-1/2 hover:text-black mx-auto p-2 px-10 rounded-md cursor-pointer"
                            value={"Add Cloth"}
                        />
                    </div>
                </form>
                <form onSubmit={onSubmitPhoto} encType="multipart/form-data">
                    <div>
                        <div className="flex w-full items-center justify-center mb-5 relative">
                            <label
                                htmlFor="photo"
                                className="absolute -top-5 text-sm left-0"
                            >
                                Photo
                            </label>
                            <input
                                type="file"
                                className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                                id="photo"
                                onChange={handleFileSelect}
                                accept="image/png, image/jpg, image/jpeg"
                                multiple
                            />
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center">
                        <input
                            type="submit"
                            className="bg-[#66d9c2] hover:bg-[#4aa996] w-full p-2 px-8 rounded-md cursor-pointer"
                            value={"Add photo / photos"}
                        />
                    </div>
                    <div className="flex w-full flex-col items-center justify-cente relative">
                        {selectedFiles && (
                            <div className="w-[350px] mt-5 border-2 border-[#66d9c2] rounded-xl">
                                <Slider {...sliderSettings}>
                                    {selectedFiles.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="p-1 rounded-xl"
                                        />
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <label className="absolute -bottom-12 text-sm left-50 text-[#999]">
                            You can add multiple photos
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sell;
