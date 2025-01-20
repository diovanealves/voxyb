"use client";

import { createAudio } from "@/app/actions/create-audio";
import { getPaymentStatus } from "@/app/actions/get-payment-status";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { CheckCircleIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handlePayment() {
      setLoading(true);
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          redirect("/dashboard");
        }

        const paymentStatus = await getPaymentStatus(sessionId);

        if (paymentStatus.status === "paid" && paymentStatus.data) {
          await createAudio({
            title: paymentStatus.data.title,
            text: paymentStatus.data.text,
            "voice-id": paymentStatus.data["voice-id"],
            paymentSessionId: sessionId,
            userId: paymentStatus.data.userId,
          });
        }

        toast({
          variant: "success",
          description: "Audio has been created successfully.",
        });

        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          description:
            "An error occurred while creating the audio. Please contact support.",
        });
      }
    }

    handlePayment();
  }, [searchParams]);

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Card className="w-11/12">
        <CardHeader className="mt-5 flex flex-col items-center">
          <CheckCircleIcon className="mb-2 h-12 w-12 text-green-500" />
          <CardTitle className="text-center text-xl font-bold">
            Purchase Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="mb-5 text-center">
          <p className="mb-7">
            Thank you for your purchase. Your audio is now being prepared.
          </p>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2Icon className="h-6 w-6 animate-spin" />
              <p>Generating audio...</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 font-semibold text-green-500">
              <CheckCircleIcon className="h-6 w-6" />
              <p>Audio generation complete!</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" disabled={loading} asChild>
            <Link
              href="/dashboard/audios"
              style={{ pointerEvents: loading ? "none" : "auto" }}
            >
              Go to My Audios
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
