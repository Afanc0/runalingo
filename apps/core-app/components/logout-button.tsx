"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button onClick={logout} className="bg-transparent text-black rounded-full border border-black hover:bg-red-500 hover:border-red-500 hover:text-white py-5 px-4">
    <span className="text-base flex justify-center items-center gap-3">
          Log Out
          <LogOut className="!w-4 !h-4"/>
      </span>
  </Button>;
}
