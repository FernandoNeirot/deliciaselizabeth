import type { Metadata } from "next";
import Admin from "@/views/Admin";

export const metadata: Metadata = {
  title: "Panel de Administración",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <Admin />;
}
