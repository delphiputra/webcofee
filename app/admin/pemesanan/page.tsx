"use client";

import { useEffect, useState } from "react";

export default function PemesananPage() {
  const [orderDetails, setOrderDetails] = useState<{ items: any[]; buyerName?: string }>({
    items: [],
  });

  // Mengambil data pesanan dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderDetails(parsedOrder);
      } catch (error) {
        console.error("Gagal memuat data pesanan dari localStorage:", error);
      }
    }
  }, []);

  const handleOrderCompletion = (itemId: string) => {
    if (orderDetails) {
      const updatedItems = orderDetails.items.filter((item) => item.id !== itemId);
      const updatedOrder = { ...orderDetails, items: updatedItems };
      setOrderDetails(updatedOrder);
      localStorage.setItem("order", JSON.stringify(updatedOrder));
    }
  };

  const handleNewOrder = (newOrder: any) => {
    // Cek apakah item dengan ID yang sama sudah ada
    const existingItem = orderDetails.items.find((item) => item.id === newOrder.id);
    let updatedItems;

    if (existingItem) {
      // Jika item sudah ada, perbarui jumlahnya
      updatedItems = orderDetails.items.map((item) =>
        item.id === newOrder.id
          ? { ...item, quantity: item.quantity + newOrder.quantity }
          : item
      );
    } else {
      // Jika item baru, tambahkan ke daftar
      updatedItems = [...orderDetails.items, newOrder];
    }

    const updatedOrder = { ...orderDetails, items: updatedItems };
    setOrderDetails(updatedOrder);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Detail Pemesanan
        </h1>

        <div className="bg-white shadow rounded-lg p-6">
          {!orderDetails.items.length ? (
            <p className="text-center text-gray-500">Tidak ada pesanan.</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Nama Pembeli:{" "}
                <span className="font-extrabold text-blue-500">
                  {orderDetails.buyerName || "Tidak Diketahui"}
                </span>
              </h2>

              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-200">
                  <tr>
                    <th className="px-4 py-2 border text-black">Nama</th>
                    <th className="px-4 py-2 border text-black">Harga</th>
                    <th className="px-4 py-2 border text-black">Jumlah</th>
                    <th className="px-4 py-2 border text-black">Total Harga</th>
                    <th className="px-4 py-2 border text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border text-black">{item.name}</td>
                      <td className="px-4 py-2 border text-black">Rp {item.price}</td>
                      <td className="px-4 py-2 border text-black">{item.quantity}</td>
                      <td className="px-4 py-2 border text-black">Rp {item.price * item.quantity}</td>
                      <td className="px-4 py-2 border text-center text-black">
                        <button
                          onClick={() => handleOrderCompletion(item.id)}
                          className="ml-2 text-sm text-white bg-green-500 rounded px-2 py-1 hover:bg-green-600"
                        >
                          Pesanan Selesai
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
