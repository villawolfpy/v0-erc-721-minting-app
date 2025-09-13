"use client";

import NextDynamic from "next/dynamic";

// Si tu panel está en otra ruta, ajusta el import.
// En tu repo suele ser "@/components/admin"
const Admin = NextDynamic(() => import("@/components/admin"), {
  ssr: false,
  loading: () => null,
});

export default function AdminClient() {
  return <Admin />;
}
