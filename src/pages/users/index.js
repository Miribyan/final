import ReviewComponent from "@/components/postComponentPreview";
import PostPreviewComponent from "@/components/postComponent";
import CommentComponent from "@/components/commentsComponent";
import prisma from "@/lib/prisma";

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function Reviews(props) {
    const [reviews, setReviews] = useState(props.review);
    const { t } = useTranslation();
    // console.log(reviews);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div class="bg-white px-6 py-20 sm:py-24 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        WELCOME...
                    </h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600">
                        ...TO THE PORTAL WITH REVIEWS OF YOUR FAVORITE WORKS
                    </p>
                </div>
            </div>
            <ReviewComponent reviews={reviews} />
        </main>
    );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
    const review = await prisma.review.findMany({
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
        },
    };
}
