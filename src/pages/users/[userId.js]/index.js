import ReviewComponent from "@/components/postComponentPreview";
import prisma from "@/lib/prisma";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function Reviews(props) {
    const [reviews, setReviews] = useState(props.review);
    const { t } = useTranslation();

    return (
        <main className="flex min-h-screen w-full flex-col items-center">
            <div className="flex w-full  justify-between  pb-5 mb-5 w-full ">
                <h3 className="mx-10  inline-flex items-center text-xl font-semibold leading-6 text-gray-900">
                    {props.userName}
                </h3>
                <Link
                    href={`/new_review`}
                    className="text-md text-gray-900  mx-10 inline-flex items-center py-1.5 px-2 text-xs sm:py-2 sm:px-3 md:py-2.5 md:px-4 text-xs text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                    + NEW REVIEW
                </Link>
            </div>
            {reviews.length > 0 ? (
                <ReviewComponent reviews={reviews} />
            ) : (
                <div className=" bg-white px-6 py-20 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            У вас пока нет отзывов...
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            ...но вы можете это исправить
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export async function getServerSideProps({ locale, req, res }) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: `${process.env.NEXT_PUBLIC_URL}/api/auth/signin`,
                permanent: false,
            },
        };
    }
    const userId = session.user.id;
    const userName = session.user.name;

    const review = await prisma.review.findMany({
        where: {
            authorId: userId,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
            Taggings: {
                select: {
                    tagId: true,
                    tag: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
            Like: {
                select: {
                    id: true,
                },
            },
            Comment: {
                select: {
                    id: true,
                },
            },
            work: {
                select: {
                    title: true,
                    Rating: {
                        select: {
                            stars: true,
                        },
                    },
                },
            },
        },
    });
    // console.log(review);

    const serializedReview = review.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
    }));
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "main"])),
            review: serializedReview,
            userId: userId,
            userName: userName,
        },
    };
}
