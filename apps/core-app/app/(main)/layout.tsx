import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import { NavItem } from "@/components/ui/sidebar";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { School, Trophy } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Runalingo - Learn Quechua fast and effective",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
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
        title: 'Achievements',
        path: '/achievements',
        icon: Trophy,
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
      <body className={`${montserrat.className} antialiased`}>
        <DashboardLayout navItems={navItems}>
            {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
