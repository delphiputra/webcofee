import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definisi tipe untuk request body
interface MakananRequestBody {
  id?: string;
  name: string;
  price: string;
}

interface Request {
  json: () => Promise<MakananRequestBody>;
}

export async function GET(req: Request): Promise<Response> {
  try {
    const makanan = await prisma.makanan.findMany();
    return new Response(JSON.stringify(makanan), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { name, price } = body;

    const newMakanan = await prisma.makanan.create({
      data: { name, price: parseFloat(price) },
    });

    return new Response(JSON.stringify(newMakanan), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { id, name, price } = body;

    const updatedMakanan = await prisma.makanan.update({
      where: { id: Number(id) },
      data: { name, price: parseFloat(price) },
    });

    return new Response(JSON.stringify(updatedMakanan), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { id } = body;

    await prisma.makanan.delete({
      where: { id: Number(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
