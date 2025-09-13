// app/admin/page.tsx
"use client";

// ✅ Fuerza render 100% cliente (sin SSG/ISR)
export const dynamic = "force-dynamic";
export const revalidate = 0;            // número >= 0 (0 = no cache)
export const fetchCache = "force-no-store";

import dynamic from "next/dynamic";

// Si tu panel está en otra ruta, ajusta el import.
// En tu repo suele ser "@/components/admin"
const Admin = dynamic(() => import("@/components/admin"), {
  ssr: false,
  loading: () => null,
});

export default function AdminPage() {
  return <Admin />;
}
