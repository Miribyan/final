import ReviewComponent from "@/components/postComponentPreview";
import prisma from "@/lib/prisma";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function Reviews(props) {
    const [reviews, setReviews] = useState(props.review);
    const { t } = useTranslation();

    console.log(reviews);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ReviewComponent reviews={reviews} />
        </main>
    );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
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
