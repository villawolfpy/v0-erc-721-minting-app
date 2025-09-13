"use client";

import dynamic from "next/dynamic";

// Configuración para evitar problemas de SSR
const Admin = dynamic(() => import("@/components/admin"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Cargando panel de administración...</p>
      </div>
    </div>
  ),
});

export default function AdminPage() {
  return <Admin />;
}
