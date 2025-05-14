export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen max-w-3xl m-auto py-8 container-paper">
      {children}
    </main>
  );
}
