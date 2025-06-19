import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignIn } from "@/app/(public)/signin/_components";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <SignIn />
    </>
  );
}
