export default function Home() {
  return (
    // For now simply route users to the login page.
    // This can later be replaced with an auth-aware redirect.
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <a
        href="/login"
        className="rounded-lg bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cyan-700"
      >
        Go to Login
      </a>
      </main>
  );
}
