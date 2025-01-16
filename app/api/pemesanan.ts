import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { userId, makananId, minumanId } = req.body;

      // Menyimpan data pemesanan
      const newPesanan = await prisma.pesanan.create({
        data: {
          userId,
          makananId,
          minumanId,
        },
      });

      res.status(201).json(newPesanan);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
