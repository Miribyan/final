import Link from "next/link";
const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    return (
        <div className="">
            <div className="flex justify-between border-gray-200 pb-5 mb-5 w-full shadow-md">
                <h3 className="mx-10 underline inline-flex items-center text-xl font-semibold leading-6 text-gray-900">
                    ADMIN PAGE
                </h3>
                <Link
                    href={`/new_review`}
                    className="text-md text-gray-900  mx-10 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                    + NEW REVIEW
                </Link>
            </div>
            <div className="mt-8 flow-root px-4 sm:px-6 lg:px">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map((person, personIdx) => (
                                    <tr key={person.email}>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                                            )}
                                        >
                                            {person.name}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                                            )}
                                        >
                                            {person.title}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                                            )}
                                        >
                                            {person.email}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                            )}
                                        >
                                            {person.role}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                                            )}
                                        >
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                                <span className="sr-only">
                                                    , {person.name}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
