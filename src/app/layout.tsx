import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Website profile/portfolio dengan Next.js + Tailwind + Postgres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-dvh bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}