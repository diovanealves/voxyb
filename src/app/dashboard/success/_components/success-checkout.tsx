import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SuccessCheckout() {
  return (
    <main className="flex h-full items-center justify-center">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
          <CardTitle className="text-center text-xl font-bold">
            Purchase Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="mb-4">
            Thank you for your purchase. Your audio is now being prepared.
          </p>

          <Button variant="outline" asChild>
            <Link href="/dashboard/audios">Go to My Audios</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
