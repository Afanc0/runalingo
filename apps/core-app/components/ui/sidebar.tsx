// Imports remain the same
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import React from "react";
import Link from "next/link";

import Image from "next/image";
import logo from "@/assets/In-line Logo.png"

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
                    className="border-2 box-border border-b-4 border-transparent rounded-[12px] w-full h-[3.25rem] justify-start gap-3 px-2 py-1 hover:border-[#0754CF] hover:bg-transparent hover:text-inherit"
                >
                    <IconComponent className="!h-8 !w-8 mr-5 ml-[6px]" />
                    <span className="text-base leading-tight select-none tracking-[.8px] font-bold">
                        {item.title}
                    </span>
                </Button>
            </Link>
        </div>
    );
}

export async function Sidebar({ navItems, className }: SidebarProps) {
    
    return (
        <div className={cn("flex h-screen min-w-64 flex-col bg-sidebar border-r border-[#0754CF] py-5", className)}>
            <div className="flex h-16 items-center px-6 gap-[10px]">
                <Image src={logo} alt="Runalingo Logo" width={42} />
                <h2 className="text-lg font-bold text-sidebar-foreground">runalingo.</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4 flex flex-col gap-1">
                {navItems.map((item) => (
                    <SidebarNavItem key={item.title} item={item} />
                ))}
            </nav>
        </div>
    )
}