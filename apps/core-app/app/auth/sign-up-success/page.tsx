
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#091B38]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <span className="text-2xl text-[#FDFDFD] font-bold text-center">Thank you for signing up!</span>
          <span className="text-[#FDFDFD] font-bold text-center">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </span>
        </div>
      </div>
    </div>
  );
}
