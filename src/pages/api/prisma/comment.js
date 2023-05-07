import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { workTitle, year, director } = req.body;
    const result = await prisma.work.create({
      data: {
        title: workTitle,
        year: +year,
        director: director,
      },
    });
    res.json(result);
  }
}
