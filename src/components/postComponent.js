import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function ReviewComponentFull({
    review,
    comments,
    likes,
    ratings,
}) {
    const [currentRating, setCurrentRating] = useState(undefined);
    const router = useRouter();
    const { data: session } = useSession();
    const [likesState, setLikesState] = useState(likes);
    const [currentLike, setCurrentLike] = useState(undefined);
    const userId = session?.user.id;
    const [rating, setRating] = useState(ratings);
    const [stars, setStars] = useState(0);
    const findUnique = (array) => {
        return array.find((item) => item.userId === userId);
    };

    const sum = rating.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.stars;
    }, 0);

    const averageRating = sum / rating.length;

    useEffect(() => {
        setCurrentLike(findUnique(likesState));
    }, [session, likesState]);

    useEffect(() => {
        const userRating = findUnique(rating);
        const currentStar = userRating?.stars;
        setCurrentRating(userRating);
        setStars(currentStar);
    }, [session, rating]);

    const setRatingFunction = async (stars) => {
        if (!currentRating) {
            try {
                const workId = review.workId;
                const data = { userId, workId, stars };
                const response = await fetch(
                    "http://127.0.0.1:3000/api/prisma/rating",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                ).then((res) => res.json());
                setStars(+stars);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const ratingId = currentRating.id;
                const workId = review.workId;
                const data = {
                    userId,
                    workId,
                    stars,
                    ratingId,
                };
                const response = await fetch(
                    "http://127.0.0.1:3000/api/prisma/rating",
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                );
                setStars(+stars);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const defaultProfileImage =
        "https://res.cloudinary.com/dpd2rrpsn/image/upload/v1683640292/y8uangxq31jvsb8iprox.jpg";

    const likeClick = async () => {
        if (!currentLike) {
            try {
                const reviewId = review.id;
                const data = { userId, reviewId };
                const response = await fetch(
                    "http://127.0.0.1:3000/api/prisma/like",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                ).then((res) => res.json());

                setLikesState([...likesState, response]);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const reviewId = review.id;
                const data = { userId, reviewId, likeId: currentLike.id };
                const response = await fetch(
                    "http://127.0.0.1:3000/api/prisma/like",
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                );

                setLikesState(
                    likesState.filter((like) => like.id !== currentLike.id)
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div
                key={review.id}
                className="bg-white border rounded-md py-5 mb-5 shadow"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {review.reviewName}
                        </h2>
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
                                    {averageRating.toFixed(1)}
                                </div>
                            </div>
                            <div className="">
                                <Rating
                                    name="customized-10"
                                    onChange={(event, newValue) => {
                                        setRatingFunction(newValue);
                                    }}
                                    max={5}
                                    value={stars}
                                    emptyIcon={
                                        <StarIcon
                                            style={{ opacity: 0.55 }}
                                            fontSize="inherit"
                                        />
                                    }
                                />
                                <p className="text-xs text-center text-gray-400">
                                    Set your rate!
                                </p>
                            </div>
                        </div>

                        <div className=" space-y-5 border-t border-gray-200  sm:mt-5 ">
                            <article
                                key={review.id}
                                className="flex max-w-xl flex-col items-start justify-between"
                            >
                                <div className="flex items-center gap-x-4 text-xs">
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
                                <div className=" group relative mt-5 mb-5">
                                    <img
                                        src={review.imageUrl}
                                        alt=""
                                        className="h-fit w-full rounded-xl mb-5 bg-gray-50 shadow-xl"
                                    />
                                    <article className="h-fit prose-sm text-sm leading-6 text-gray-600">
                                        <ReactMarkdown>
                                            {review.content}
                                        </ReactMarkdown>
                                    </article>{" "}
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
                                        <button
                                            onClick={likeClick}
                                            className="flex text-sm mb-1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className={`w-5 h-5 ${
                                                    !!currentLike
                                                        ? "fill-red-500"
                                                        : "fill-gray-400"
                                                } mr-2`}
                                            >
                                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                            </svg>
                                            {likesState.length}
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
                                            {comments.length}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
