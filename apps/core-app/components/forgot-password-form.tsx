"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-[10px] p-3", className)} {...props}>
      {success ? (
        <>
          <span className="text-2xl text-[#FDFDFD] font-bold text-center">Check Your Email</span>
          <span className="text-[#FDFDFD] text-center">Password reset instructions sent.</span>
        </>
      ) : (
        <>
          <span className="text-2xl text-[#FDFDFD] font-bold text-center">Forgot password</span>
          <span className="text-[#FDFDFD] text-center">We will send you instructions on how to reset your password by email.</span>
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-3">
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
              </div>
              {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
              <div>
                  <Button className="rounded-xl min-w-full min-h-12 bg-[#0754CF] py-5 font-bold uppercase text-[#091B38] border-2 border-b-4 border-[#073377] hover:bg-[#2967ca]" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
              </div>
          </form>
        </>
      )}
    </div>
  );
}
