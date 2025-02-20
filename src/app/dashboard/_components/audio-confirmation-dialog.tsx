import { createCheckout } from "@/app/actions/create-checkout";
import { ErrorToast } from "@/components/error-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function AudioConfirmationDialog() {
  const formContext = useFormContext();

  async function onSubmit() {
    try {
      const values = formContext.getValues();
      const payment = await createCheckout({
        title: values.title,
        text: values.text,
        "voice-id": values["voice-id"],
        languagesConfirmed: values.languagesConfirmed,
      });

      if (!payment) {
        ErrorToast({ message: "Error creating payment link" });
      }

      formContext.reset();
      window.location.href = payment.url;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ErrorToast({ message: error.message });
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="mb-3 mt-5 w-full"
          disabled={!formContext.formState.isValid}
        >
          Create audio
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Audio Generation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to generate this audio? Once generated, you
            won&apos;t be able to edit the text or change the voice settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            disabled={formContext.formState.isSubmitting}
          >
            {formContext.formState.isSubmitting ? (
              <>
                <LoaderIcon className="animate-spin" />
                Generating payment link...
              </>
            ) : (
              "Generate Audio"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
