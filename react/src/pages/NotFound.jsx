import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <main className="grid place-items-center bg-[#cde9e4] h-screen px-6 py-24 sm:py-32 lg:px-8">
                <div className="bg-white m-auto p-20 pl-40 pr-40 rounded-2xl mt-20 text-center">
                    <p className="text-base font-bold text-[#389d89]">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-[#389d89] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#66d9c2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <Link to="/home">Go back home</Link>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
};

export default NotFound;
