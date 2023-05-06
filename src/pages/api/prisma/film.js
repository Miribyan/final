import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { filmTitle, year, director } = req.body;
  const result = await prisma.film.create({
    data: {
      title: filmTitle,
      year: +year,
      director: director,
    },
  });
  res.json(result);
}
