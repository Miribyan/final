import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Login_Component from "../login-btn";
import { useCallback, useEffect, useState } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
        width: 32,
        height: 32,
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                "#fff"
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2,
    },
}));

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

    // const handleSubmit = useCallback(() => {
    //     router.push(`/search?text=${searchValue}`);
    // }, [searchValue]);
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
                                My Page
                            </Link>
                        </div>
                        <form
                            action="/search"
                            // onSubmit={handleSubmit}
                            class="flex w-1/3 lg:w-1/2 items-center"
                        >
                            <label for="simple-search" class="sr-only">
                                Search
                            </label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search"
                                    required
                                    name="text"
                                    defaultValue={searchValue}
                                    // onChange={(e) => {
                                    //     setSearchValue(e.target.value);
                                    // }}
                                />
                            </div>
                            <button
                                type="submit"
                                class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </form>

                        {/* <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-1/2 rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                        /> */}
                        <div className="flex w-1/3 lg:w-1/4 items-center">
                            <select
                                onChange={handleLangChange}
                                value={currentLang}
                                className=" block rounded-md border-0 py-1.5 pl-1 md:pl-2 lg:pl-3 pr-3 md:pr-5 lg:pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="en">English</option>
                                <option value="ru">Russian</option>
                            </select>
                            {/* <FormControlLabel
                                control={
                                    <MaterialUISwitch
                                        sx={{ m: 1 }}
                                        defaultChecked
                                    />
                                }
                                className="m-0"
                            /> */}
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
                                {/* <div>
                                    <FormControlLabel
                                        control={
                                            <MaterialUISwitch
                                                sx={{ m: 1 }}
                                                defaultChecked
                                            />
                                        }
                                        label="shift"
                                    />
                                </div> */}
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

                            <form class="flex items-center">
                                <label for="simple-search" class="sr-only">
                                    Search
                                </label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                    <span class="sr-only">Search</span>
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
                                className="text-md w-1/8 text-gray-900 px-3"
                            >
                                My Page
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
