"use client";

import { useEffect, useState } from "react";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Pastikan path yang benar sesuai versi
import { useRouter } from "next/navigation"; 
import Link from "next/link";

// Definisi tipe untuk makanan dan minuman
interface Makanan {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Minuman {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function CoffeeMenu() {
  const [makanan, setMakanan] = useState<Makanan[]>([]);
  const [minuman, setMinuman] = useState<Minuman[]>([]);
  const [cart, setCart] = useState<number>(0); 
  const router = useRouter(); 

  // Ambil data makanan dari API
  async function fetchMakanan() {
    const res = await fetch("/api/makanan");
    const data = await res.json();
    setMakanan(data);
  }

  // Ambil data minuman dari API
  async function fetchMinuman() {
    const res = await fetch("/api/minuman");
    const data = await res.json();
    setMinuman(data);
  }

  // Fungsi untuk mengarahkan pengguna ke halaman detail pesanan
  const handleOrderNow = (item: Makanan | Minuman) => {
    setCart(cart + 1);
    
    // Menyimpan data ke localStorage dengan jumlah item
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === item.id);
    if (itemIndex === -1) {
      existingCart.push({ ...item, quantity: 1 });
    } else {
      existingCart[itemIndex].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));

     // Navigasi ke halaman detail pesanan
  };

  // Fetch data saat komponen dimuat
  useEffect(() => {
    fetchMakanan();
    fetchMinuman();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-extrabold text-center text-gray-800 flex-grow">
              Welcome to Our Coffee Shop ☕
            </h1>

            {/* Keranjang Icon di kanan atas */}
            <div className="relative">
              <Link href="/pembeli/order">
                <button className="p-2 bg-blue-900 text-white rounded-full hover:bg-blue-950">
                  <ShoppingCartIcon className="w-6 h-6" />
                  {cart > 0 && (
                    <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {cart}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-600 mb-10 text-lg">
            Explore our artisan coffee menu and discover your favorite cup!
          </p>

          <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-800">Makanan Menu 🍽️</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {makanan.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                  <span className="text-lg font-semibold text-green-600">Rp {item.price}</span>
                </div>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  onClick={() => handleOrderNow(item)}
                  className="mt-6 w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-800 mt-10">Minuman Menu 🍹</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {minuman.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                  <span className="text-lg font-semibold text-green-600">Rp {item.price}</span>
                </div>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  onClick={() => handleOrderNow(item)}
                  className="mt-6 w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
