"use client";

import { useEffect, useState } from "react";

// Definisikan tipe untuk minuman
type Minuman = {
  id: string;
  name: string;
  price: number;
};

export default function MinumanPage() {
  const [minuman, setMinuman] = useState<Minuman[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data minuman
  async function fetchMinuman() {
    try {
      const res = await fetch("/api/minuman");
      if (!res.ok) {
        console.error("Gagal mengambil data minuman");
        return;
      }
      const data = await res.json();
      setMinuman(data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data minuman:", error);
    }
  }

  // Tambah minuman baru
  async function addMinuman() {
    if (newName && parseFloat(newPrice) > 0) {
      try {
        const res = await fetch("/api/minuman", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
        });

        if (res.ok) {
          fetchMinuman();
          setNewName("");
          setNewPrice("");
        } else {
          console.error("Gagal menambahkan minuman");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan minuman:", error);
      }
    } else {
      console.error("Nama dan harga harus valid!");
    }
  }

  // Edit minuman
  async function editMinuman() {
    if (editingId && newName && parseFloat(newPrice) > 0) {
      try {
        const res = await fetch("/api/minuman", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            name: newName,
            price: parseFloat(newPrice),
          }),
        });

        if (res.ok) {
          fetchMinuman();
          setEditingId(null);
          setNewName("");
          setNewPrice("");
        } else {
          console.error("Gagal mengedit minuman");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengedit minuman:", error);
      }
    } else {
      console.error("Nama dan harga harus valid!");
    }
  }

  // Hapus minuman
  async function deleteMinuman(id: string) {
    try {
      const res = await fetch("/api/minuman", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchMinuman();
      } else {
        console.error("Gagal menghapus minuman");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus minuman:", error);
    }
  }

  // Isi data untuk edit
  function handleEdit(item: Minuman) {
    setEditingId(item.id);
    setNewName(item.name);
    setNewPrice(item.price.toString());
  }

  // Ambil data minuman saat komponen dimuat
  useEffect(() => {
    fetchMinuman();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-700 mb-6 text-center">
        🍹 Manajemen Minuman
      </h1>

      {/* Form Tambah/Edit */}
      <div className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          {editingId ? "✏️ Edit Minuman" : "➕ Tambah Minuman"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Nama Minuman"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded-lg p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Harga"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="border rounded-lg p-3 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={editingId ? editMinuman : addMinuman}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition sm:col-span-2 lg:col-span-1"
          >
            {editingId ? "Simpan" : "Tambah"}
          </button>
        </div>
      </div>

      {/* Tabel Daftar Minuman */}
      <div className="overflow-x-auto bg-white shadow rounded-lg p-6">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Nama</th>
              <th className="border px-4 py-2 text-left">Harga</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {minuman.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-gray-800">{item.id}</td>
                <td className="border px-4 py-2 text-gray-800">{item.name}</td>
                <td className="border px-4 py-2 text-gray-800">{item.price}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMinuman(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {minuman.length === 0 && (
          <div className="text-center text-gray-500 mt-4">Tidak ada data minuman.</div>
        )}
      </div>
    </div>
  );
}
