import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/ui/ClientProviders";

export const metadata: Metadata = {
  title: "QLASS — Education ERP for Schools & Coaching",
  description: "Manage classes, students, teachers, lectures, attendance, and academic operations with QLASS Education ERP platform.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><rect width='36' height='36' rx='8' fill='%232563EB'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Inter' font-weight='800' font-size='20'>Q</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <ClientProviders />
      </body>
    </html>
  );
}
