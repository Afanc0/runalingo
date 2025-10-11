import { SignUpForm } from "@/components/sign-up-form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#091B38] flex-col">
      <div className="absolute top-7 left-7 text-[#B2B2B2]">
        <Link href="/">
          <X className="h-9 w-9"/>
        </Link>
      </div>
      <div className="absolute right-7 top-7">
        <Link href="/auth/login">
          <Button className="rounded-xl py-[10px] border-2 border-b-4 min-h-12 border-[#9D9D9D] hover:bg-transparent bg-transparent hover:border-[#525252]">
              <span className="uppercase font-bold text-[#9D9D9D]">
                Login
              </span>
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
      <footer className="p-[10px]">
          <span className="text-[#B2B2B2] text-sm">
              © 2025 runalingo • Quechua made simple, fun, and alive.
          </span>
      </footer>
    </div>
  );
}
