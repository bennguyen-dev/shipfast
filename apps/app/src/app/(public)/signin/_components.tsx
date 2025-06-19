import Image from "next/image";
import { providerMap, signIn } from "@/auth";
import { GithubIcon, GoogleIcon } from "@/components/icons";
import * as process from "node:process";
type ProviderWithName = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

const IconPlatforms: Record<string, React.ReactNode> = {
  GitHub: <GithubIcon className="me-2 size-5" />,
  Google: <GoogleIcon className="me-2 size-5" />,
};

export const SignIn = () => {
  const providers = Object.values(providerMap) as ProviderWithName[];

  return (
    <div className="flex h-full max-w-screen-2xl flex-col items-center py-12 sm:py-24">
      <div className="mb-8">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={64} 
          height={64} 
          priority 
          className="size-16"
        />
      </div>
      
      <div className="w-full max-w-[24rem] rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight">
            Join{" "}
            <span className="text-primary">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </h1>
          <p className="text-muted-foreground">
            Join our community and start generating OG images with 700+ other users
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {providers.map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                await signIn(provider.id, { redirectTo: "/dashboard/sites" });
              }}
              className="w-full"
            >
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {IconPlatforms[provider.name] || null}
                <span>Sign in with {provider.name}</span>
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};
