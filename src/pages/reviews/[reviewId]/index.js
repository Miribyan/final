import prisma from "@/lib/prisma";
import { useRouter } from "next/router";
import ReviewComponentFull from "@/components/postComponent";
import { useTranslation } from "next-i18next";
import CommentComponent from "@/components/commentsComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ReviewPage({ reviewId, review, comments, likes , ratings}) {
    const { t } = useTranslation();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ReviewComponentFull
                review={review}
                comments={comments}
                likes={likes}
                ratings={ratings}
            />
            <CommentComponent reviewId={reviewId} comments={comments} />
        </main>
    );
}

export async function getServerSideProps(context) {
    const reviewId = context.params.reviewId;
    const comments = await prisma.comment.findMany({
        where: {
            reviewId: +reviewId,
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
    const serializedComments = comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
    }));


    const likes = await prisma.like.findMany({
        where: {
            reviewId: +reviewId,
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
    });

    const serializedLikes = likes.map((like) => ({
        ...like,
        createdAt: like.createdAt.toISOString(),
    }));
    const maybeReview = await prisma.review.findUnique({
        where: {
            id: +reviewId,
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
            work: {
                select: {
                    title: true,
                },
            },
        },
    });

 const rating = await prisma.rating.findMany({
        where: {
            workId: +maybeReview.workId,
        },
        include: {
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
    const serializedRating = rating.map((rating) => ({
        ...rating,
        createdAt: rating.createdAt.toISOString(),
    }));

    if (maybeReview) {
        maybeReview.createdAt = maybeReview.createdAt.toISOString();
    }
    return {
        props: {
            ...(await serverSideTranslations(context.locale, [
                "common",
                "main",
            ])),
            reviewId,
            review: maybeReview,
            comments: serializedComments,
            likes: serializedLikes,
            ratings: serializedRating
        },
        notFound: maybeReview === undefined || maybeReview === null,
    };
}
