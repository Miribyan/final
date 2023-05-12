import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
const defaultProfileImage =
    "https://res.cloudinary.com/dpd2rrpsn/image/upload/v1683640292/y8uangxq31jvsb8iprox.jpg";

export default function CommentComponent({ reviewId, comments }) {
    const { data: session } = useSession();
    const userId = session?.user.id;
    const [commentText, setCommentText] = useState("");
    const router = useRouter();
    const [commentState, setCommentState] = useState(comments);
    const refreshData = () => {
        router.replace(router.asPath);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (commentText.length > 0) {
                const data = { commentText, userId, reviewId };
                const response = await fetch(
                    `${process.env.URL}/api/prisma/comment`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                ).then((response) => response.json());
                setCommentText("");

                
                setCommentState(response);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const deleteButton = async (props) => {
        if (userId === props.userId) {
            const commentId = props.id;
            try {
                const data = { commentId, reviewId };
                const response = await fetch(
                    `${process.env.URL}/api/prisma/comment/`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                ).then((response) => response.json());

                setCommentState(response);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <section className="w-full bg-white dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Discussion ({commentState.length})
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <label for="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                type="text"
                                value={commentText}
                                id="comment"
                                rows="6"
                                onChange={(event) =>
                                    setCommentText(event.target.value)
                                }
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Post comment
                        </button>
                    </form>
                    {commentState.length > 0 ? (
                        commentState.map((comment) => (
                            <>
                                <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 ">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <img
                                                    className="mr-2 w-6 h-6 rounded-full"
                                                    src={defaultProfileImage}
                                                    alt=""
                                                />
                                                {comment.user.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <time
                                                    dateTime={new Date(
                                                        comment.createdAt
                                                    ).toLocaleDateString()}
                                                >
                                                    {new Date(
                                                        comment.createdAt
                                                    ).toLocaleDateString()}
                                                </time>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                deleteButton(comment);
                                            }}
                                            type="button"
                                            className="inline-flex items-center py-1 px-2 text-xs  text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                        >
                                            Х
                                        </button>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {comment.content}
                                    </p>
                                </article>
                                <div className="relative">
                                    <div
                                        className="absolute inset-0 flex justify-center items-center"
                                        aria-hidden="true"
                                    >
                                        <div className="w-1/2 border-t border-gray-100" />
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <>
                            <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 ">
                                <footer className="flex justify-center items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="text-gray-400 self-center">
                                            Здесь пока нет комментариев
                                        </p>
                                    </div>
                                </footer>
                            </article>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
