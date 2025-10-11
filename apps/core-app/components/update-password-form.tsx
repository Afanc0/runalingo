"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye } from "lucide-react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passVisibility, setPassVisibility] = useState(false)
  const [repassVisibility, setRepassVisibility] = useState(false)
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/learn");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <span className="text-2xl text-[#FDFDFD] font-bold text-center">Reset Password</span>
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-3">
          <div className="flex flex-col gap-5 py-5">
              <div className="rounded-xl border-2 border-b-4 border-[#9D9D9D] px-5 py-[3px] min-h-12 focus:border-[#0754CF] flex flex-row items-center gap-3">
                <Input
                  id="password"
                  type={passVisibility ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="!border-none !outline-none focus:!outline-none focus:!ring-0 focus:!border-none p-0 text-[#FDFDFD]"
                />
                <div className="cursor-pointer" onClick={() => setPassVisibility(prev => !prev)}>
                  <Eye className="h-6 w-6 text-[#0754CF]"/>
                </div>
              </div>
              <div className="rounded-xl border-2 border-b-4 border-[#9D9D9D] px-5 py-[3px] min-h-12 focus:border-[#0754CF] flex flex-row items-center gap-3">
                <Input
                  id="repeat-password"
                  type={repassVisibility ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="!border-none !outline-none focus:!outline-none focus:!ring-0 focus:!border-none p-0 text-[#FDFDFD]"
                />
                <div className="cursor-pointer" onClick={() => setRepassVisibility(prev => !prev)}>
                  <Eye className="h-6 w-6 text-[#0754CF]"/>
                </div>
              </div>
          </div>
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <div>
              <Button className="rounded-xl min-w-full min-h-12 bg-[#0754CF] py-5 font-bold uppercase text-[#091B38] border-2 border-b-4 border-[#073377] hover:bg-[#2967ca]" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
              </Button>
          </div>
      </form>
    </div>
  );
}
