import { auth } from "@/auth";
import { SignIn } from "@/app/(public)/signin/_components";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  // If user is already authenticated, show them options
  if (session?.user) {
    return (
      <div className="flex h-full max-w-screen-2xl flex-col items-center py-12 sm:py-24">
        <div className="w-full max-w-[24rem] rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight">
              Welcome back, {session.user.name}!
            </h1>
            <p className="text-muted-foreground">
              You&apos;re already signed in. What would you like to do?
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignIn />
    </>
  );
}
