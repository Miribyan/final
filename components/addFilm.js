import { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AddFilmModalFormComponent({ isOpen, isActive }) {
  const cancelButtonRef = useRef(null);
  const [filmTitle, setFilmTitle] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");

  const handleSubmit =  (event) => {
    event.preventDefault();
    isOpen(false);
    // const data = {
    //   filmTitle, year, director
    // }
    // console.log(data)
    // const response = await fetch("api/prisma/film", {
    //   method: "POST",
    //   body: JSON,
    // }
    // );
  };

  return (
    <>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Добавить в коллекцию
                      </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col px-4 py-3 sm:py-4">
                          <label
                            htmlFor="filmTitle"
                            className="mb-2 block text-sm text-start font-medium leading-6 text-gray-900"
                          >
                            Название фильма
                          </label>
                          <input
                            required
                            id="filmTitle"
                            name="filmTitle"
                            type="text"
                            value={filmTitle}
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(event) =>
                              setFilmTitle(event.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col px-4 py-3 sm:py-4">
                          <label
                            htmlFor="year"
                            className="mb-2 block text-sm text-start font-medium leading-6 text-gray-900"
                          >
                            Год выпуска:
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
                            htmlFor="Director"
                            className="mb-2 block text-sm font-medium text-start leading-6 text-gray-900"
                          >
                            Режиссер
                          </label>
                          <input
                            required
                            id="director"
                            name="director"
                            type="text"
                            value={director}
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(event) =>
                              setDirector(event.target.value)
                            }
                          />
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                            type="submit"
                          >
                            Добавить
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={() => isOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Отмена
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
    </>
  );
}
