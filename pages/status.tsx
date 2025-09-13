export default function StatusPage() {
  const ENV = {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_CARBONO: process.env.NEXT_PUBLIC_CARBONO,
    NEXT_PUBLIC_EXPERIENCIA: process.env.NEXT_PUBLIC_EXPERIENCIA,
  };

  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Status DApp</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Compilado con estas variables públicas:
      </p>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 16,
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {JSON.stringify(ENV, null, 2)}
      </pre>
      <p style={{ marginTop: 16 }}>
        Abre esta página en <code>/status</code>.
      </p>
    </main>
  );
}
