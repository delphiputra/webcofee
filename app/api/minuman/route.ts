import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definisikan tipe untuk request body
interface MinumanRequestBody {
  id?: string;
  name: string;
  price: string;
}

interface Request {
  json: () => Promise<MinumanRequestBody>;
}

export async function GET(req: Request): Promise<Response> {
  try {
    const minuman = await prisma.minuman.findMany();
    return new Response(JSON.stringify(minuman), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { name, price } = body;

    const newMinuman = await prisma.minuman.create({
      data: { name, price: parseFloat(price) },
    });

    return new Response(JSON.stringify(newMinuman), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { id, name, price } = body;

    const updatedMinuman = await prisma.minuman.update({
      where: { id: Number(id) },
      data: { name, price: parseFloat(price) },
    });

    return new Response(JSON.stringify(updatedMinuman), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { id } = body;

    await prisma.minuman.delete({
      where: { id: Number(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
