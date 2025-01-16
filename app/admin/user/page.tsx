"use client";

import { useEffect, useState } from "react";

// Definisikan tipe untuk data pengguna
type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Pembeli";
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newRole, setNewRole] = useState<"Admin" | "Pembeli">("Pembeli");
  const [newPassword, setNewPassword] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data pengguna
  async function fetchUsers() {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) {
        const errorResponse = await res.json().catch(() => null);
        throw new Error(errorResponse?.error || `HTTP error! status: ${res.status}`);
      }
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", (error as Error).message);
    }
  }

  // Tambah pengguna baru
  async function addUser() {
    if (newName && newEmail && newPassword) {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newName,
            email: newEmail,
            role: newRole,
            password: newPassword,
          }),
        });

        if (res.ok) {
          fetchUsers();
          setNewName("");
          setNewEmail("");
          setNewRole("Pembeli");
          setNewPassword("");
        } else {
          console.error("Gagal menambahkan pengguna");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan pengguna:", (error as Error).message);
      }
    } else {
      console.error("Semua field harus diisi!");
    }
  }

  // Edit pengguna
  async function editUser() {
    if (editingId && newName && newEmail) {
      try {
        const res = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            name: newName,
            email: newEmail,
            role: newRole,
            password: newPassword || undefined,
          }),
        });

        if (res.ok) {
          fetchUsers();
          setEditingId(null);
          setNewName("");
          setNewEmail("");
          setNewRole("Pembeli");
          setNewPassword("");
        } else {
          console.error("Gagal mengedit pengguna");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengedit pengguna:", (error as Error).message);
      }
    } else {
      console.error("Nama dan email harus diisi!");
    }
  }

  // Hapus pengguna
  async function deleteUser(id: string) {
    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Gagal menghapus pengguna");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus pengguna:", (error as Error).message);
    }
  }

  // Isi data untuk edit
  function handleEdit(user: User) {
    setEditingId(user.id);
    setNewName(user.name);
    setNewEmail(user.email);
    setNewRole(user.role);
    setNewPassword(""); // Reset password saat edit
  }

  // Ambil data pengguna saat komponen dimuat
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-700 mb-6 text-center">
        👥 Manajemen Pengguna
      </h1>

      {/* Form Tambah/Edit */}
      <div className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          {editingId ? "✏️ Edit Pengguna" : "➕ Tambah Pengguna"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Nama"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded-lg p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border rounded-lg p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded-lg p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as "Admin" | "Pembeli")}
            className="border rounded-lg p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Admin">Admin</option>
            <option value="Pembeli">Pembeli</option>
          </select>
          <button
            onClick={editingId ? editUser : addUser}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition sm:col-span-2 lg:col-span-1"
          >
            {editingId ? "Simpan" : "Tambah"}
          </button>
        </div>
      </div>

      {/* Tabel Daftar Pengguna */}
      <div className="overflow-x-auto bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Nama</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-gray-800">{user.id}</td>
                <td className="border px-4 py-2 text-gray-800">{user.name}</td>
                <td className="border px-4 py-2 text-gray-800">{user.email}</td>
                <td className="border px-4 py-2 text-gray-800">{user.role}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center text-gray-500 mt-4">Tidak ada data pengguna.</div>
        )}
      </div>
    </div>
  );
}
