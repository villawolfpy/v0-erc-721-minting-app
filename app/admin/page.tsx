// app/admin/page.tsx
import AdminClient from "./AdminClient";

// ✅ Fuerza render 100% cliente (sin SSG/ISR)
export const dynamic = "force-dynamic";
export const revalidate = 0; // número >= 0 (0 = no cache)
export const fetchCache = "force-no-store";

export default function AdminPage() {
  return <AdminClient />;
}
