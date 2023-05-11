import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {
            mainTitle,
            workId,
            group,
            reviewText,
            imageUrl,
            userId,
            rating,
            reviewTags,
            reviewTagsObj,
        } = req.body;
        try {
            const result = await prisma.review.create({
                data: {
                    reviewName: mainTitle,
                    category: group,
                    workId: +workId,
                    authorId: userId,
                    imageUrl: imageUrl,
                    content: reviewText,
                    stars: +rating,
                },
            });
            
            const creatingTags = await prisma.tag.createMany({
                data: reviewTagsObj,
                skipDuplicates: true,
            });
            const resultTags = await prisma.tag.findMany({
                where: {
                    title: {
                        in: reviewTags,
                    },
                },
            });
            const modifiedResult = resultTags.map((item) => ({
                tagId: item.id,
                reviewId: +result.id,
            }));
            const createTaggings = await prisma.taggings.createMany({
                data: modifiedResult,
            });res.json(result)
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
}
