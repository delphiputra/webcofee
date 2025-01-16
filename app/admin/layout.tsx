"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Mendapatkan path aktif
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State untuk modal

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "User", path: "/admin/user" },
    { name: "Pemesanan", path: "/admin/pemesanan" },
    { name: "Makanan", path: "/admin/makanan" },
    { name: "Minuman", path: "/admin/minuman" },
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        {/* Header Sidebar */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 rounded transition ${
                    pathname === item.path
                      ? "bg-gray-700 text-orange-500 font-bold"
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tombol Logout */}
        <div className="p-4 bg-gray-900">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full text-center"
          >
            Logout
          </button>
        </div>

        {/* Footer */}
        <footer className="p-4 text-center text-sm bg-gray-900">
          &copy; 2024 CoffeeShop Admin
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

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
