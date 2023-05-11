import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userId, reviewId } = req.body;
        const result = await prisma.like.create({
            data: {
                reviewId: +reviewId,
                userId: userId,
            },
        });
        res.json(result);
    } else if (req.method === "PATCH") {
        try {
            const { likeId } = req.body;

            const result = await prisma.like.delete({
                where: {
                    id: +likeId,
                },
            });
            res.status(200).json({ message: "Лайк успешно удален" });
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
