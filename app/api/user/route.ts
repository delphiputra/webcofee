import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Definisikan tipe untuk request body
interface UserRequestBody {
  id?: number; // Optional, hanya diperlukan untuk update
  name: string;
  email: string;
  role: string;
  password: string;
}

// Endpoint GET untuk mengambil semua data pengguna
export async function GET(req: Request): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

// Endpoint POST untuk menambahkan pengguna baru
export async function POST(req: Request): Promise<Response> {
  try {
    const { name, email, role, password } = await req.json();

    // Validasi input
    if (!name || !email || !role || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, role, password: hashedPassword },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to create user" }),
      { status: 500 }
    );
  }
}

// Endpoint PUT untuk mengedit pengguna
export async function PUT(req: Request): Promise<Response> {
  try {
    const { id, name, email, role, password } = await req.json();

    // Validasi input
    if (!id || !name || !email || !role || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role, password: hashedPassword },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500 }
    );
  }
}

// Endpoint DELETE untuk menghapus pengguna
export async function DELETE(req: Request): Promise<Response> {
  try {
    const { id } = await req.json();

    // Validasi input
    if (!id) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedUser), { status: 200 });
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to delete user" }),
      { status: 500 }
    );
  }
}
