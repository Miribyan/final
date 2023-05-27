import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Login_Component from "../login-btn";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

function Header() {
    const router = useRouter();
    const { t } = useTranslation();
    const [currentLang, setCurrentLang] = useState(router.locale);
    const changeLang = (lang) => {
        const currentPath = router.asPath;
        const newPath = currentPath.replace(`/${currentLang}`, `/${lang}`);
        router.push(newPath, newPath, { locale: lang });
    };
    const { data: session } = useSession();
    const userId = session?.user.id;
    const [searchValue, setSearchValue] = useState(router.query.text);
    useEffect(() => {
        setCurrentLang(router.locale);
    }, [router.locale]);

    const handleLangChange = (event) => {
        const lang = event.target.value;
        changeLang(lang);
    };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-white w-screen shadow-md">
                <nav
                    className="mx-auto w-full py-5 md:px-8"
                    aria-label="Global"
                >
                    <div className="hidden md:flex md:justify-between md: items-center md:gap-x-12">
                        <div className="flex w-1/3 lg:w-1/4">
                            <Link
                                href="/"
                                className=" text-xs text-gray-900 px-2 md:text-base md:px-3 "
                            >
                                {t("common:main")}
                            </Link>
                            <Link
                                href={`/users/${userId}`}
                                className="text-xs w-1/8 text-gray-900 px-2 md:text-base md:px-3"
                            >
                                {t("common:myPage")}
                            </Link>
                        </div>
                        <form
                            action="/search"
                            className="flex w-1/3 lg:w-1/2 items-center"
                        >
                            <label htmlFor="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 "
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                    placeholder="Search"
                                    required
                                    name="text"
                                    defaultValue={searchValue}
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>

                        <div className="flex w-1/3 lg:w-1/4 items-center">
                            <select
                                onChange={handleLangChange}
                                value={currentLang}
                                className="bg-white block rounded-md border-0 py-1.5 pl-1 md:pl-2 lg:pl-3 pr-3 md:pr-5 lg:pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="en">English</option>
                                <option value="ru">Russian</option>
                            </select>

                            <Link
                                href="/"
                                className="text-md ml-10 text-gray-900"
                            >
                                <Login_Component />
                            </Link>
                        </div>
                    </div>
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </nav>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-1">
                                <button
                                    type="button"
                                    className="rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">
                                    {" "}
                                    {t("common:yourCompany")}
                                </span>
                            </a>
                            <div className="flex flex-1 justify-end">
                                <Link
                                    href="/"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    <Login_Component />
                                </Link>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between">
                                <div>
                                    <select
                                        onChange={handleLangChange}
                                        value={currentLang}
                                        className="mt-2 w-32 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="en">English</option>
                                        <option value="ru">Russian</option>
                                    </select>
                                </div>
                            </div>

                            <form className="flex items-center">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 "
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                                        placeholder="Search"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>

                            <Link
                                href="/"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {t("common:main")}
                            </Link>
                            <Link
                                href={`/users/${userId}`}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {t("common:myPage")}
                            </Link>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            <div className="relative mb-5">
                <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                >
                    <div className="w-full border-t border-gray-300" />
                </div>
            </div>
        </>
    );
}

export default Header;
