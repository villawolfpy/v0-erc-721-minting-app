// app/admin/page.tsx
"use client";

import dynamic from "next/dynamic";

// Si tu panel está en otra ruta, ajusta el import.
// En tu repo suele ser "@/components/admin"
const Admin = dynamic(() => import("@/components/admin"), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Cargando panel de administración...</div>,
});

export default function AdminPage() {
  return <Admin />;
}
