import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function ReviewComponent({ reviews }) {
    const router = useRouter();
    const { t } = useTranslation();
    const defaultProfileImage =
        "https://res.cloudinary.com/dpd2rrpsn/image/upload/v1683640292/y8uangxq31jvsb8iprox.jpg";
    return (
        <>
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-white w-full border rounded-md py-5 mb-5 shadow sm:w-2/3"
                >
                    <div className="mx-auto w-full px-6 lg:px-8">
                        <div className="mx-auto">
                            <div className="flex w-full justify-between">
                                <h2 className="text-1xl w-2/3 font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {review.reviewName}
                                </h2>
                                <button
                                    onClick={() => {
                                        router.push(`/reviews/${review.id}`);
                                    }}
                                    className="inline-flex h-fit w-fit items-center py-1.5 px-2 text-xs sm:py-2 sm:px-3 md:py-2.5 md:px-4 text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800"
                                    type="button"
                                >
                                    {t("common:read")}
                                </button>
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <div className="flex">
                                    <p className="mt-2 text-lg leading-8 text-gray-600">
                                        {review.work.title}
                                    </p>
                                    <div className="mx-1 flex items-center text-xs">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-4 h-4 fill-yellow-300"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {review.work.Rating.reduce(
                                            (sum, rating) => sum + rating.stars,
                                            0
                                        ) / review.work.Rating.length}
                                    </div>
                                </div>
                            </div>

                            <div className=" space-y-5 w-full border-t border-gray-200  sm:mt-5 ">
                                <article
                                    key={review.id}
                                    className="flex flex-col items-start justify-between"
                                >
                                    <div className="flex w-full items-center gap-x-4 text-xs">
                                        <time
                                            dateTime={new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                            className="text-gray-500"
                                        >
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </time>
                                        <a
                                            href={review.category}
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {review.category}
                                        </a>
                                        <span className="flex items-center text-gray-500">
                                            Author: {review.stars}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4 fill-yellow-300 ml-1"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="flex w-full group relative mt-5 mb-5">
                                        <article
                                            className={` h-fit pr-5 prose-sm line-clamp-6 text-sm leading-6 text-gray-600 ${
                                                !!review.imageUrl
                                                    ? "w-1/2"
                                                    : "w-full"
                                            } `}
                                        >
                                            <ReactMarkdown>
                                                {review.content}
                                            </ReactMarkdown>
                                        </article>

                                        <img
                                            src={review.imageUrl}
                                            alt=""
                                            className={` h-fit w-1/2 justify-center rounded-xl  mb-5 bg-gray-50 shadow-xl ${
                                                !!review.imageUrl
                                                    ? "block"
                                                    : "hidden"
                                            } `}
                                        />
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <div className="relative mt-8 flex items-center gap-x-4">
                                            <img
                                                src={defaultProfileImage}
                                                alt=""
                                                className="h-10 w-10 rounded-full bg-gray-50"
                                            />
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900">
                                                    <a>
                                                        <span className="absolute inset-0" />
                                                        {review.author.name}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="self-end text-gray-500 ">
                                            <button className="flex text-sm mb-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5 fill-red-500 mr-2"
                                                >
                                                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                </svg>
                                                {review.Like.length}
                                            </button>
                                            <button className=" flex text-sm">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5 fill-blue-500 mr-2 "
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {review.Comment.length}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
