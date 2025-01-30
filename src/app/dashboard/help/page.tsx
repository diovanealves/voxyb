import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelpForm } from "./_components/help-form";

import { ensureUserAuthenticated } from "@/app/actions/ensure-user-authenticated";

export default async function Help() {
  const { session } = await ensureUserAuthenticated();

  return (
    <div className="mx-auto flex h-full w-11/12 flex-col justify-center py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Help Us Improve</CardTitle>
          <CardDescription>
            Share your thoughts, report bugs, or suggest new features to enhance
            your experience.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <HelpForm email={session.email ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
