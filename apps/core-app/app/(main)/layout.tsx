import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
// import "./globals.css";

import { NavItem } from "@/components/ui/sidebar";

import { CircleEllipsis, School, User } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dashboard",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    const navItems: NavItem[] = [
        {
            title: 'Learn',
            path: '/learn',
            icon: School,
            show: true
        },
        {
            title: 'Profile',
            path: '/profile',
            icon: User,
            show: true
        },
        {
            title: 'More',
            path: '/more',
            icon: CircleEllipsis,
            show: true
        }
    ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <DashboardLayout navItems={navItems}>
            {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
