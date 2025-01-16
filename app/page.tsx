import { redirect } from "next/navigation";

export default function Home() {
  // Redirect ke halaman login
  redirect("/login");

  return null; // Tidak menampilkan konten di halaman root
}
