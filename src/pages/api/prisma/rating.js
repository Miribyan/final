import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userId, workId, stars } = req.body;
        const rating = await prisma.rating.create({
            data: {
                userId: userId,
                workId: +workId,
                stars: +stars,
            },
        });
        res.json(rating);
    } else if (req.method === "PATCH") {
        const { userId, workId, stars, ratingId } = req.body;
        console.log(ratingId, "12345");
        const rating = await prisma.rating.update({
            where: {
                id: +ratingId,
            },
            data: {
                userId: userId,
                workId: +workId,
                stars: +stars,
            },
        });
        res.json(rating);
    }
}
