import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AchievementDashboard } from "@/components/achievement-dashboard";


export default async function DashboardPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return (
        <div className="h-screen overflow-y-scroll w-full">
            <AchievementDashboard />
        </div>
    );
}
