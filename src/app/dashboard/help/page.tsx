"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HelpForm } from "./_components/help-form";

export default function Help() {
  return (
    <div className="mx-auto flex h-full w-11/12 flex-col justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Help Us Improve</CardTitle>
          <CardDescription>
            Share your thoughts, report bugs, or suggest new features to enhance
            your experience.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <HelpForm />
        </CardContent>
      </Card>
    </div>
  );
}
