"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State untuk modal

  const menuItems = [
    { name: "Menu", path: "/pembeli" },
  ];

  const handleLogout = () => {
    setIsLogoutModalOpen(true); // Tampilkan modal
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    // Arahkan ke halaman login
    window.location.href = "/login";
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false); // Tutup modal
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 vb v gsza text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">Pembeli</h1>
          <nav>
            <ul className="flex space-x-6">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className="text-white hover:text-yellow-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg font-semibold">☕ Coffee Shop</p>
          <p className="text-sm mt-1">
            Bringing the best coffee to your cup every day.
          </p>
          <p className="text-xs mt-2">&copy; 2024 Coffee Shop. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Konfirmasi Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin keluar?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-green-800 rounded hover:bg-green-950 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
