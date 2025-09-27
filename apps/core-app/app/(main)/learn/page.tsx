import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/ui/sidebar";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return (
        <div>
            <h1>bye</h1>
        </div>
    );
}
