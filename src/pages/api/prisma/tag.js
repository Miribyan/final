import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { reviewTags, reviewTagsObj, reviewId } = req.body;
        const creatingTags = await prisma.tag.createMany({
            data: reviewTagsObj,
            skipDuplicates: true,
        });
        const result = await prisma.tag.findMany({
            where: {
                title: {
                    in: reviewTags,
                },
            },
        });
        const modifiedResult = result.map((item) => ({
            tagId: item.id,
            reviewId: +reviewId,
        }));
        console.log("Result", modifiedResult);
        const createTaggings = await prisma.taggings.createMany({
            data: modifiedResult,
        });
        res.json(createTaggings);
    }
}
