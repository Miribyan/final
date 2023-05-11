import ReviewComponent from "@/components/postComponentPreview";
import prisma from "@/lib/prisma";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function Reviews(props) {
    const [reviews, setReviews] = useState(props.review);
    const { t } = useTranslation();

    console.log(reviews);
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-between">
            <div className="flex justify-between border-gray-200 pb-5 mb-5 w-full shadow-md">
                <h3 className="mx-10 underline inline-flex items-center text-xl font-semibold leading-6 text-gray-900">
                    MY PAGE
                </h3>
                <Link
                    href={`/new_review`}
                    className="text-md text-gray-900  mx-10 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                    + NEW REVIEW
                </Link>
            </div>
            <ReviewComponent reviews={reviews} />
        </main>
    );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export async function getServerSideProps({ locale, req, res }) {
    const session = await getServerSession(req, res, authOptions);
    const userId = session.user.id;

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
    console.log(review);

    const serializedReview = review.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
    }));
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "main"])),
            review: serializedReview,
        },
    };
}
