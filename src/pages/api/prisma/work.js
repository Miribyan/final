import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { workTitle, year, author, category } = req.body;
        const result = await prisma.work.create({
            data: {
                title: workTitle,
                year: +year,
                author: author,
                category: category,
            },
        });
        res.json(result);
 
    }
}
