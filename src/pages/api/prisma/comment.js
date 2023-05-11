import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { commentText, userId, reviewId } = req.body;
            const result = await prisma.comment.create({
                data: {
                    reviewId: +reviewId,
                    userId: userId,
                    content: commentText,
                },
            });
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
            res.json(serializedComments);
        } catch (error) {
            console.error(error);
        }
    } else if (req.method === "PATCH") {
        try {
            const { commentId, reviewId } = req.body;
            const result = await prisma.comment.delete({
                where: {
                    id: commentId,
                },
            });
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
            res.json(serializedComments);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Произошла ошибка при удалении лайка",
            });
        }
    } else {
        res.status(405).json({ message: "Метод не разрешен" });
    }
}
