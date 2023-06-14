import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import "./cardStyle.css";
import { cards } from "../helpers/creditCards";

const americanExpressRegex = /^3[47]\d{0,13}/,
    discoverRegex = /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
    dinersRegex = /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
    mastercardRegex = /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
    maestroRegex = /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
    visaRegex = /^4\d{0,15}/,
    unionpayRegex = /^62\d{0,14}/;

/*
========
TESTING
========
VISA, 4556532681944635
MASTERCARD, 5417472178452949
UNIONPAY, 6226982253632909
DINERS, 3012294742533382
DISCOVER, 6011245597793400
AMERICAN_EXPRESS, 3714 496353 98431
*/

const Payments = () => {
    const { setNotification } = useStateContext();
    const user_id = JSON.parse(localStorage.getItem("user"));
    const [clicked, isClicked] = useState(false);
    const [errors, setErrors] = useState(null);
    const [card, setCard] = useState({
        fullname: "",
        cardnumber: "",
        expiration: "",
        securecode: "",
        user_id: user_id.id,
    });

    const [cardStyle, setCardStyle] = useState("");
    const [cardColor, setCardColor] = useState({ light: "", dark: "" });

    const flippingCardHandler = () => {
        isClicked(!clicked);
    };

    const changeToFalse = () => {
        isClicked(false);
    };

    useEffect(() => {
        if (americanExpressRegex.test(card.cardnumber)) {
            setCardStyle(cards.american_express);
            setCardColor({
                light: "green",
                dark: "greendark",
            });
        }

        if (visaRegex.test(card.cardnumber)) {
            setCardStyle(cards.visa);
            setCardColor({
                light: "lime",
                dark: "limedark",
            });
        }

        if (dinersRegex.test(card.cardnumber)) {
            setCardStyle(cards.diners);
            setCardColor({
                light: "orange",
                dark: "orangedark",
            });
        }

        if (discoverRegex.test(card.cardnumber)) {
            setCardStyle(cards.discover);
            setCardColor({
                light: "purple",
                dark: "purpledark",
            });
        }

        if (maestroRegex.test(card.cardnumber)) {
            setCardStyle(cards.maestro);
            setCardColor({
                light: "yellow",
                dark: "yellowdark",
            });
        }

        if (mastercardRegex.test(card.cardnumber)) {
            setCardStyle(cards.mastercard);
            setCardColor({
                light: "lightblue",
                dark: "lightbluedark",
            });
        }

        if (unionpayRegex.test(card.cardnumber)) {
            setCardStyle(cards.unionpay);
            setCardColor({
                light: "cyan",
                dark: "cyandark",
            });
        }

        if (!card.cardnumber) {
            setCardStyle("");
            setCardColor({
                light: "grey",
                dark: "greydark",
            });
        }
    }, [card.cardnumber]);

    const resetForm = () => {
        setCard({
            ...card,
            cardnumber: "",
            expiration: "",
            securecode: "",
            fullname: "",
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        resetForm();

        axiosClient
            .post("/account/payment", card)
            .then(() => {
                setNotification("Card was successfully added");
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
        <div className="w-full py-10">
            <div className="flex flex-col items-center">
                <p className="border-2 tracking-widest p-5 w-1/3 text-center mb-10 text-2xl relative">
                    Payments<span className="text-3xl">💳</span>
                    <button className="bg-[#ffffff] border-2 border-b-0 border-l-0 absolute left-0 bottom-0 hover:bg-[#eee] mx-auto mt-5 p-2 px-4 cursor-pointer text-sm">
                        <Link to={"/account/delivery"}>
                            See delivery options
                        </Link>
                    </button>
                    <button className="bg-[#ffffff] border-2 border-b-0 border-r-0 absolute right-0 bottom-0 hover:bg-[#eee] mx-auto mt-5 p-2 px-4 cursor-pointer text-sm">
                        <Link to={"/cards"}>See your cards</Link>
                    </button>
                </p>

                {errors && (
                    <div className="alert w-1/3">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                <form className="w-[400px]" onSubmit={onSubmit}>
                    <div className="flex w-full items-center justify-center mt-10 relative">
                        <label
                            htmlFor="fullname"
                            className="absolute -top-5 text-sm left-0"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                            placeholder="Full Name"
                            onFocus={changeToFalse}
                            onChange={(e) =>
                                setCard({
                                    ...card,
                                    fullname: e.target.value,
                                })
                            }
                            value={card.fullname}
                        />
                    </div>
                    <div className="flex w-full items-center justify-center mt-10 relative">
                        <label
                            htmlFor="cardnumber"
                            className="absolute -top-5 text-sm left-0"
                        >
                            Card Number
                        </label>
                        <PatternFormat
                            format="#### #### #### ####"
                            placeholder="0000 0000 0000 0000"
                            className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                            id="cardnumber"
                            onFocus={changeToFalse}
                            onChange={(e) =>
                                setCard({
                                    ...card,
                                    cardnumber: e.target.value,
                                })
                            }
                            value={card.cardnumber}
                        />
                    </div>
                    <div className="flex gap-2 pb-5">
                        <div className="flex w-full items-center justify-center mt-10 relative">
                            <label
                                htmlFor="expiration"
                                className="absolute -top-5 text-sm left-0"
                            >
                                Expiration
                            </label>
                            <PatternFormat
                                format="##/####"
                                placeholder="mm/yyyy"
                                className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                                id="expiration"
                                onFocus={changeToFalse}
                                onChange={(e) =>
                                    setCard({
                                        ...card,
                                        expiration: e.target.value,
                                    })
                                }
                                value={card.expiration}
                            />
                        </div>
                        <div className="flex w-full items-center justify-center mt-10 relative">
                            <label
                                htmlFor="secure"
                                className="absolute -top-5 text-sm left-0"
                            >
                                Secure Code
                            </label>
                            <PatternFormat
                                format="###"
                                placeholder="000"
                                className="border-2 outline-[#66d9c2] p-2 text-md w-full"
                                id="secure"
                                onFocus={flippingCardHandler}
                                onChange={(e) =>
                                    setCard({
                                        ...card,
                                        securecode: e.target.value,
                                    })
                                }
                                value={card.securecode}
                            />
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <input
                            type="submit"
                            className="bg-[#66d9c2] hover:bg-[#4aa996] mx-auto p-2 px-4 rounded-md cursor-pointer"
                            value={"Add your card"}
                        />
                        <input
                            type="reset"
                            className="bg-[#616161] text-white hover:bg-[#bdbdbd] hover:text-black mx-auto p-2 px-4 rounded-md cursor-pointer"
                            value={"Reset"}
                            onClick={resetForm}
                        />
                    </div>
                </form>

                <div>
                    <div className="container preload">
                        <div
                            className={
                                clicked ? "creditcard flipped" : "creditcard"
                            }
                            onClick={flippingCardHandler}
                        >
                            <div className="front">
                                <div id="ccsingle">
                                    <img src={cardStyle} alt="" width={100} />
                                </div>
                                <svg
                                    version="1.1"
                                    id="cardfront"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 750 471"
                                    xmlSpace="preserve"
                                >
                                    <g id="Front">
                                        <g id="CardBackground">
                                            <g id="Page-1_1_">
                                                <g id="amex_1_">
                                                    <path
                                                        id="Rectangle-1_1_"
                                                        className={
                                                            !cardColor.light
                                                                ? "lightcolor grey"
                                                                : `lightcolor ${cardColor.light}`
                                                        }
                                                        d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                            C0,17.9,17.9,0,40,0z"
                                                    />
                                                </g>
                                            </g>
                                            <path
                                                className={
                                                    !cardColor.dark
                                                        ? "darkcolor greydark"
                                                        : `darkcolor ${cardColor.dark}`
                                                }
                                                d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
                                            />
                                        </g>
                                        <text
                                            transform="matrix(1 0 0 1 60.106 295.0121)"
                                            id="svgnumber"
                                            className="st2 st3 st4 select-none"
                                        >
                                            {!card.cardnumber
                                                ? "0123 4567 8910 1112"
                                                : card.cardnumber}
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 54.1064 428.1723)"
                                            id="svgname"
                                            className="st2 st5 st6 select-none"
                                        >
                                            {!card.fullname
                                                ? "YOUR NAME"
                                                : card.fullname}
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 54.1074 389.8793)"
                                            className="st7 st5 st8 select-none"
                                        >
                                            cardholder name
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 479.7754 388.8793)"
                                            className="st7 st5 st8 select-none"
                                        >
                                            expiration
                                        </text>
                                        <text
                                            transform="matrix(1 0 0 1 65.1054 241.5)"
                                            className="st7 st5 st8 select-none"
                                        >
                                            card number
                                        </text>
                                        <g>
                                            <text
                                                transform="matrix(1 0 0 1 574.4219 433.8095)"
                                                id="svgexpire"
                                                className="st2 st5 st9 select-none"
                                            >
                                                {!card.expiration
                                                    ? "01/23"
                                                    : card.expiration}
                                            </text>
                                            <text
                                                transform="matrix(1 0 0 1 479.3848 417.0097)"
                                                className="st2 st10 st11 select-none"
                                            >
                                                VALID
                                            </text>
                                            <text
                                                transform="matrix(1 0 0 1 479.3848 435.6762)"
                                                className="st2 st10 st11 select-none"
                                            >
                                                THRU
                                            </text>
                                            <polygon
                                                className="st2"
                                                points="554.5,421 540.4,414.2 540.4,427.9 		"
                                            />
                                        </g>
                                        <g id="cchip">
                                            <g>
                                                <path
                                                    className="st2"
                                                    d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                        c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
                                                />
                                            </g>
                                            <g>
                                                <g>
                                                    <rect
                                                        x="82"
                                                        y="70"
                                                        className="st12"
                                                        width="1.5"
                                                        height="60"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="167.4"
                                                        y="70"
                                                        className="st12"
                                                        width="1.5"
                                                        height="60"
                                                    />
                                                </g>
                                                <g>
                                                    <path
                                                        className="st12"
                                                        d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                            c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                            C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                            c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                            c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="82.8"
                                                        y="82.1"
                                                        className="st12"
                                                        width="25.8"
                                                        height="1.5"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="82.8"
                                                        y="117.9"
                                                        className="st12"
                                                        width="26.1"
                                                        height="1.5"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="142.4"
                                                        y="82.1"
                                                        className="st12"
                                                        width="25.8"
                                                        height="1.5"
                                                    />
                                                </g>
                                                <g>
                                                    <rect
                                                        x="142"
                                                        y="117.9"
                                                        className="st12"
                                                        width="26.2"
                                                        height="1.5"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                    <g id="Back"></g>
                                </svg>
                            </div>
                            <div className="back">
                                <svg
                                    version="1.1"
                                    id="cardback"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 750 471"
                                    xmlSpace="preserve"
                                >
                                    <g id="Front">
                                        <line
                                            className="st0"
                                            x1="35.3"
                                            y1="10.4"
                                            x2="36.7"
                                            y2="11"
                                        />
                                    </g>
                                    <g id="Back">
                                        <g id="Page-1_2_">
                                            <g id="amex_2_">
                                                <path
                                                    id="Rectangle-1_2_"
                                                    className={
                                                        !cardColor.dark
                                                            ? "darkcolor greydark"
                                                            : `darkcolor ${cardColor.dark}`
                                                    }
                                                    d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                        C0,17.9,17.9,0,40,0z"
                                                />
                                            </g>
                                        </g>
                                        <rect
                                            y="61.6"
                                            className="st2"
                                            width="750"
                                            height="78"
                                        />
                                        <g>
                                            <path
                                                className="st3"
                                                d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
                    C707.1,246.4,704.4,249.1,701.1,249.1z"
                                            />
                                            <rect
                                                x="42.9"
                                                y="198.6"
                                                className="st4"
                                                width="664.1"
                                                height="10.5"
                                            />
                                            <rect
                                                x="42.9"
                                                y="224.5"
                                                className="st4"
                                                width="664.1"
                                                height="10.5"
                                            />
                                            <path
                                                className="st5"
                                                d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
                                            />
                                        </g>
                                        <text
                                            transform="matrix(1 0 0 1 621.999 227.2734)"
                                            id="svgsecurity"
                                            className="st6 st7 select-none"
                                        >
                                            {!card.securecode
                                                ? "999"
                                                : card.securecode}
                                        </text>
                                        <g className="st8">
                                            <text
                                                transform="matrix(1 0 0 1 518.083 280.0879)"
                                                className="st9 st6 st10 select-none"
                                            >
                                                security code
                                            </text>
                                        </g>
                                        <rect
                                            x="58.1"
                                            y="378.6"
                                            className="st11"
                                            width="375.5"
                                            height="13.5"
                                        />
                                        <rect
                                            x="58.1"
                                            y="405.6"
                                            className="st11"
                                            width="421.7"
                                            height="13.5"
                                        />
                                        <text
                                            transform="matrix(1 0 0 1 59.5073 228.6099)"
                                            id="svgnameback"
                                            className="st12 st13 select-none"
                                        >
                                            {!card.fullname
                                                ? "YOUR NAME"
                                                : card.fullname}
                                        </text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
