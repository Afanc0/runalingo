// Imports remain the same
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
        <div className="outline-none select-auto">
            <Link href={item.path}>
                <Button
                    key={item.title}
                    variant="ghost"
                    className="border-2 box-border border-solid border-transparent rounded-[12px] w-full h-[3.25rem] justify-start gap-3 text-sidebar-foreground hover:text-sidebar-accent-foreground px-2 py-1"
                >
                    <IconComponent className="!h-8 !w-8 mr-5 ml-[6px]" />
                    <span className="text-base text-[.9375rem] leading-tight select-none tracking-[.8px]">
                        {item.title}
                    </span>
                </Button>
            </Link>
        </div>
    );
}

export async function Sidebar({ navItems, className }: SidebarProps) {
    
    return (
        <div className={cn("flex h-screen min-w-64 flex-col bg-sidebar border-r border-sidebar-border", className)}>
            <div className="flex h-16 items-center px-6">
                <h2 className="text-3xl font-semibold text-sidebar-foreground">duolingo</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4 flex flex-col gap-1">
                {navItems.map((item) => (
                    <SidebarNavItem key={item.title} item={item} />
                ))}
            </nav>
        </div>
    )
}