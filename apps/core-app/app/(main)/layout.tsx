import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import { NavItem } from "@/components/ui/sidebar";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { LearnIcon } from "@/components/learn";

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
        icon: LearnIcon,
        show: true
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: ({className}) => (
          <Avatar className={className}>
            <AvatarImage src="https://github.com/evilrabbit.png" className="rounded-full h-8 w-8"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ),
        show: true
    },
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
