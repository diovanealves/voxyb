import { HelpForm } from "./_components/help-form";

import { ensureUserAuthenticated } from "@/app/actions/ensure-user-authenticated";

export default async function Help() {
  const { session } = await ensureUserAuthenticated();

  return (
    <div className="mx-auto flex h-full w-11/12 flex-col justify-center py-12">
      <h1 className="text-2xl font-bold tracking-tight">Help Us Improve</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Share your thoughts, report bugs, or suggest new features to enhance
        your experience.
      </p>

      <HelpForm email={session.email ?? ""} />
    </div>
  );
}
