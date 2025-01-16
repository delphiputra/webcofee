"use client";

import { useEffect, useState } from "react";

type Makanan = {
  id: string;
  name: string;
  price: number;
};

export default function MakananPage() {
  const [makanan, setMakanan] = useState<Makanan[]>([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data makanan
  async function fetchMakanan() {
    try {
      const res = await fetch("/api/makanan");
      if (!res.ok) {
        console.error("Gagal mengambil data makanan");
        return;
      }
      const data = await res.json();
      setMakanan(data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  }

  // Tambah makanan baru
  async function addMakanan() {
    if (newName && parseFloat(newPrice) > 0) {
      try {
        const res = await fetch("/api/makanan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
        });

        if (res.ok) {
          fetchMakanan();
          setNewName("");
          setNewPrice("");
        } else {
          console.error("Gagal menambahkan makanan");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }
  }

  // Edit makanan
  async function editMakanan() {
    if (editingId && newName && parseFloat(newPrice) > 0) {
      try {
        const res = await fetch("/api/makanan", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            name: newName,
            price: parseFloat(newPrice),
          }),
        });

        if (res.ok) {
          fetchMakanan();
          setEditingId(null);
          setNewName("");
          setNewPrice("");
        } else {
          console.error("Gagal mengedit makanan");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }
  }

  // Hapus makanan
  async function deleteMakanan(id: string) {
    try {
      const res = await fetch("/api/makanan", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchMakanan();
      } else {
        console.error("Gagal menghapus makanan");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  }

  // Isi data untuk edit
  function handleEdit(item: Makanan) {
    setEditingId(item.id);
    setNewName(item.name);
    setNewPrice(item.price.toString());
  }

  // Ambil data makanan saat komponen dimuat
  useEffect(() => {
    fetchMakanan();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-700 mb-6 text-center">
        🍽️ Manajemen Makanan
      </h1>

      {/* Form Tambah/Edit */}
      <div className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          {editingId ? "✏️ Edit Makanan" : "➕ Tambah Makanan"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Nama Makanan"
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
            onClick={editingId ? editMakanan : addMakanan}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition sm:col-span-2 lg:col-span-1"
          >
            {editingId ? "Simpan" : "Tambah"}
          </button>
        </div>
      </div>

      {/* Tabel Daftar Makanan */}
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
            {makanan.map((item) => (
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
                    onClick={() => deleteMakanan(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {makanan.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            Tidak ada data makanan.
          </div>
        )}
      </div>
    </div>
  );
}
