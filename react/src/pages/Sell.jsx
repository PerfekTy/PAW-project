import { useState } from "react";

import clothLogo from "../assets/cloth.png";

const Sell = () => {
    const [cloth, setCloth] = useState({
        clothname: "",
        clothbrand: "",
        clothprice: "",
        clothsize: "",
        clothsex: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setCloth({
            ...cloth,
            clothbrand: "",
            clothprice: "",
            clothsize: "",
            clothname: "",
            clothsex: "",
        });

        setSelectedImage(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        resetForm();

        // axiosClient
        //     .post("/account/payment", cloth)
        //     .then(() => {
        //         setNotification("cloth was successfully added");
        //     })
        //     .catch((err) => {
        //         const response = err.response;
        //         if (response && response.status === 422) {
        //             if (response.data.errors) {
        //                 setErrors(response.data.errors);
        //             }
        //         }
        //     });
    };
    return (
        <form className="w-[400px] mx-auto" onSubmit={onSubmit}>
            <div className="flex w-full items-center justify-center mt-20 relative">
                <label
                    htmlFor="cloth"
                    className="absolute -top-5 text-sm left-0"
                >
                    Cloth Name
                </label>
                <input
                    type="text"
                    id="cloth"
                    className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                    placeholder="🖊️"
                    onChange={(e) =>
                        setCloth({
                            ...cloth,
                            clothname: e.target.value,
                        })
                    }
                    value={cloth.clothname}
                />
            </div>
            <div className="flex w-full items-center justify-center mt-10 relative">
                <label
                    htmlFor="clothbrand"
                    className="absolute -top-5 text-sm left-0"
                >
                    Cloth Brand
                </label>
                <input
                    placeholder="👚"
                    className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                    id="clothbrand"
                    onChange={(e) =>
                        setCloth({
                            ...cloth,
                            clothbrand: e.target.value,
                        })
                    }
                    value={cloth.clothbrand}
                />
            </div>
            <div className="flex gap-2 pb-5">
                <div className="flex w-full items-center justify-center mt-10 relative">
                    <label
                        htmlFor="clothprice"
                        className="absolute -top-5 text-sm left-0"
                    >
                        Cloth Price
                    </label>
                    <input
                        placeholder="💲"
                        className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                        id="clothprice"
                        onChange={(e) =>
                            setCloth({
                                ...cloth,
                                clothprice: e.target.value,
                            })
                        }
                        value={cloth.clothprice}
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
                        onChange={cloth.clothsex}
                        className="w-full outline-[#66d9c2] border-2 ring-inset ring-gray-300 p-2"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div className="flex w-full items-center justify-center mt-10 relative">
                    <label
                        htmlFor="clothsize"
                        className="absolute -top-5 text-sm left-0"
                    >
                        Cloth Size
                    </label>

                    <select
                        onChange={cloth.clothsize}
                        className="w-full outline-[#66d9c2] border-2 ring-inset ring-gray-300 p-2"
                    >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>

            <div className="flex w-full items-center justify-center mt-5 relative">
                <label
                    htmlFor="clothsize"
                    className="absolute -top-5 text-sm left-0"
                >
                    Cloth description
                </label>
                <textarea
                    placeholder="ex. Brand new, almost no damages, if you're interested text me."
                    cols="30"
                    rows="10"
                    className="w-full outline-[#66d9c2] border-2 ring-inset ring-gray-300 p-2"
                ></textarea>
            </div>
            <div className="mt-5 flex justify-center">
                <img src={clothLogo} alt="clothlogo" width={130} />
            </div>
            <div className="flex w-full items-center justify-center my-5 relative">
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
                    onChange={handleImageChange}
                />
            </div>
            {selectedImage && (
                <img
                    src={selectedImage}
                    alt="Preview"
                    className="mb-5 border-2 p-2"
                />
            )}
            <div className="flex w-full items-center justify-center">
                <input
                    type="submit"
                    className="bg-[#66d9c2] hover:bg-[#4aa996] mx-auto p-2 px-16 rounded-md cursor-pointer"
                    value={"Add"}
                />
                <input
                    type="reset"
                    className="bg-[#616161] text-white hover:bg-[#bdbdbd] hover:text-black mx-auto p-2 px-10 rounded-md cursor-pointer"
                    value={"Reset"}
                    onClick={resetForm}
                />
            </div>
        </form>
    );
};

export default Sell;
