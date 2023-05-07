import prisma from "@/lib/prisma";
import { image } from "@cloudinary/url-gen/qualifiers/source";


export default async function handler(req, res) {
    if (req.method === "POST") {
      const { mainTitle, workId, group, reviewText, imageUrl, userId, rating } =
        req.body;
      const result = await prisma.review.create({
        data: {
          reviewName: mainTitle,
          category: group,
          workId: +workId,
          authorId: userId,
          imageUrl: imageUrl,
          content: reviewText,
          stars: +rating
        },
      });
      res.json(result);
    }
  }
  