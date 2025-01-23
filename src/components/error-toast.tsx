import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { ToastAction } from "./ui/toast";

interface ErrorToastProps {
  message: string;
}

export function ErrorToast({ message }: ErrorToastProps) {
  return message === "You are not signed in. Please log in and try again."
    ? toast({
        variant: "destructive",
        description: message,
        duration: 5000,
        action: (
          <ToastAction altText="Click here" asChild>
            <Link href="/login">Click here</Link>
          </ToastAction>
        ),
      })
    : toast({
        variant: "destructive",
        duration: 3000,
        description: message,
      });
}
