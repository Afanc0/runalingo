
import { NavItem, Sidebar } from "./ui/sidebar";

export const DashboardLayout = ({
    children,
    navItems
}: Readonly<{
  children: React.ReactNode;
  navItems: NavItem[];
}>) => {
    return (
        <main>
            <div className="flex items-start justify-start flex-auto min-h-0 h-screen overflow-hidden">
                <Sidebar
                    navItems={navItems}
                />
                {children}
            </div>
        </main>
    )
}