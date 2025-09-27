// Imports remain the same
import { cn, hasEnvVars } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import React from "react";
import Link from "next/link";

export interface NavItem {
    title: string
    path: string
    icon: React.ElementType
    show: boolean
}

interface SidebarProps {
    className?: string
    navItems: NavItem[]
}

interface SidebarNavItemProps {
    item: NavItem;
}

function SidebarNavItem({ item }: SidebarNavItemProps) {
    const IconComponent = item.icon;
    return (
        <Link href={item.path}>
            <Button
                key={item.title}
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <IconComponent className="h-4 w-4" />
                {item.title}
            </Button>
        </Link>
    );
}

export async function Sidebar({ navItems, className }: SidebarProps) {
    const supabase = await createClient();

    // You can also use getUser() which will be slower.
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;
    
    return (
        <div className={cn("flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border", className)}>
            <div className="flex h-16 items-center border-b border-sidebar-border px-6">
                <h2 className="text-lg font-semibold text-sidebar-foreground">RunaSimita</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                    <SidebarNavItem key={item.title} item={item} />
                ))}
            </nav>
            <div className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3 text-sm text-sidebar-foreground">
                    <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-sidebar-primary-foreground" />
                    </div>
                    <div>
                        {!hasEnvVars ? null : user?.email}
                    </div>
                </div>
            </div>
        </div>
    )
}