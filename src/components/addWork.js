import { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

export default function AddWorkModalFormComponent({ isOpen, isActive }) {
  const { t } = useTranslation();
  const cancelButtonRef = useRef(null);
  const [workTitle, setWorkTitle] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { workTitle, year, author, category };
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prisma/work`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await isOpen(false);
      setCategory("");
      setWorkTitle("");
      setAuthor("");
      setYear("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Transition.Root show={isActive} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={isOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white w-11/12 md:w-1/2 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {t("addWork:pageTitle")}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col px-4 py-3 sm:py-4">
                        <label
                          htmlFor="category"
                          className="mb-2 block text-sm text-start font-medium leading-6 text-gray-900"
                        >
                          {t("addWork:category")}
                        </label>
                        <select
                          name="category"
                          id="category"
                          onChange={(ev) => {
                            setCategory(ev.target.value);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="Game">{t("addWork:game")}</option>
                          <option value="Movie">{t("addWork:movie")}</option>
                          <option value="Book">{t("addWork:book")}</option>
                        </select>
                      </div>
                      <div className="flex flex-col px-4 py-3 sm:py-4">
                        <label
                          htmlFor="workTitle"
                          className="mb-2 block text-sm text-start font-medium leading-6 text-gray-900"
                        >
                          {t("addWork:workTitle")}
                        </label>
                        <input
                          required
                          id="workTitle"
                          name="workTitle"
                          type="text"
                          value={workTitle}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(event) => setWorkTitle(event.target.value)}
                        />
                      </div>
                      <div className="flex flex-col px-4 py-3 sm:py-4">
                        <label
                          htmlFor="year"
                          className="mb-2 block text-sm text-start font-medium leading-6 text-gray-900"
                        >
                          {t("addWork:year")}
                        </label>
                        <input
                          required
                          id="year"
                          name="year"
                          type="text"
                          value={year}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(event) => setYear(event.target.value)}
                        />
                      </div>
                      <div className="flex flex-col px-4 py-3 sm:py-4">
                        <label
                          htmlFor="author"
                          className="mb-2 block text-sm font-medium text-start leading-6 text-gray-900"
                        >
                          {t("addWork:author")}
                        </label>
                        <input
                          required
                          id="author"
                          name="author"
                          type="text"
                          value={author}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(event) => setAuthor(event.target.value)}
                        />
                      </div>
                      <div className="flex mt-5 sm:mt-6  sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                          onClick={() => isOpen(false)}
                          ref={cancelButtonRef}
                        >
                          {t("addWork:cancelButton")}
                        </button>
                        <button
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 text-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400 sm:col-start-1 sm:mt-0"
                          type="submit"
                        >
                          {t("addWork:addButton")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
