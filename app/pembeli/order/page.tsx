"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [buyerName, setBuyerName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items: any[]) => {
    let totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) item.quantity += 1;
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) item.quantity -= 1;
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    const orderDetails = {
      buyerName,
      items: cartItems.map((item) => ({ ...item, status: "Waiting" })), 
    };
    localStorage.setItem("order", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");

    // Redirect ke menu pembeli
    router.push("/pembeli");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-50 via-white to-yellow-50">
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Keranjang Belanja Anda 🛒
        </h1>

        <div className="bg-white shadow rounded-lg p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-700 font-bold">
              Keranjang Anda kosong
            </p>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Nama Pembeli:
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Masukkan nama pembeli"
                  className="w-full p-2 border border-gray-300 rounded text-black placeholder-gray-500"
                />
              </div>

              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-700">Rp {item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => increaseQuantity(item.id)} className="bg-green-500 text-white font-bold px-3 py-1 rounded">+</button>
                      <button onClick={() => decreaseQuantity(item.id)} className="bg-yellow-500 text-white font-bold px-3 py-1 rounded">-</button>
                      <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white font-bold px-3 py-1 rounded">Hapus</button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-right">
                <p className="text-2xl font-extrabold text-gray-900">Total: Rp {total}</p>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white font-bold px-6 py-3 rounded mt-4"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
