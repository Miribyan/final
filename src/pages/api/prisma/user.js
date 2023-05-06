import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    const result = await prisma.user.create({
      data: {
        name: session.user.name,
      },
    });
    res.json(result);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
