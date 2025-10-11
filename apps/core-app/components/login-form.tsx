"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
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
    <div className={cn("flex flex-col gap-[10px] p-3", className)} {...props}>
        <span className="text-2xl text-[#FDFDFD] font-bold text-center">Log in</span>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-5 py-5">
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-2 border-b-4 border-[#9D9D9D] px-5 py-[10p] min-h-12 focus:border-[#0754CF] focus:outline-none focus-visible:outline-none text-[#FDFDFD]"
                />
                <div className="rounded-xl border-2 border-b-4 border-[#9D9D9D] px-5 py-[3px] min-h-12 focus:border-[#0754CF] flex flex-row items-center gap-3">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!border-none !outline-none focus:!outline-none focus:!ring-0 focus:!border-none p-0 text-[#FDFDFD]"
                  />
                  <Link href="/auth/forgot-password">
                    <span className="text-[#9D9D9D] uppercase font-bold text-sm">Forgot?</span>
                  </Link>
                </div>
            </div>
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
            <div>
                <Button className="rounded-xl min-w-full min-h-12 bg-[#0754CF] py-5 font-bold uppercase text-[#091B38] border-2 border-b-4 border-[#073377] hover:bg-[#2967ca]" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                </Button>
            </div>
        </form>
        <div className="flex justify-center items-center py-[14px] gap-[14px]">
            <div className="border border-[#FDFDFD] inline h-[1px] flex-1"></div>
            <span className="text-[#FDFDFD] uppercase text-sm font-bold">or</span>
            <div className="border border-[#FDFDFD] inline h-[1px] flex-1"></div>
        </div>
        <div className="min-w-full rounded-xl min-h-12 border-2 border-b-4 border-[#9D9D9D] flex justify-center items-center py-[8px] gap-[10px] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span className="font-bold text-[#FDFDFD]">
              Sign in with Google
            </span>
        </div>
    </div>
  );
}
