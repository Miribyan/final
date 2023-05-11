import ReviewComponent from "@/components/postComponentPreview";
import prisma from "@/lib/prisma";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TagCloudComponent from "@/components/tagCloudComponent";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function Reviews(props) {
    const [reviews, setReviews] = useState(props.review);
    const [tags, setTags] = useState(props.tags);
    const [buttonText, setButtonText] = useState("СТАРЫЕ");
    const { t } = useTranslation();

    const handleClick = () => {
        if (buttonText === "СТАРЫЕ") {
            reviews.sort((obj1, obj2) => {
                const date1 = new Date(obj1.createdAt);
                const date2 = new Date(obj2.createdAt);

                return date2 - date1;
            });
            setButtonText("НОВЫЕ");
        } else {
            reviews.sort((obj1, obj2) => {
                const date1 = new Date(obj1.createdAt);
                const date2 = new Date(obj2.createdAt);

                return date1 - date2;
            });
            setButtonText("СТАРЫЕ");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <TagCloudComponent tags={tags} />
            <div className="bg-white px-6 py-20 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        WELCOME...
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        ...TO THE PORTAL WITH REVIEWS OF YOUR FAVORITE WORKS
                    </p>
                </div>
            </div>
            <button
                onClick={() => {
                    handleClick();
                }}
                className="inline-flex self-end mr-10 h-fit w-fit items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                type="button"
            >
                {buttonText}
            </button>
            <ReviewComponent reviews={reviews} />
        </main>
    );
}

export async function getServerSideProps({ locale }) {
    const review = await prisma.review.findMany({
        where:{
            
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
    const serializedReview = review.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
    }));

    const tags = await prisma.tag.findMany();
    const serializedTags = tags.map((tag) => ({
        ...tag,
        createdAt: tag.createdAt.toISOString(),
    }));
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "main"])),
            review: serializedReview,
            tags: serializedTags,
        },
    };
}
