"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createCheckout } from "@/app/actions/create-checkout";
import { ErrorToast } from "@/components/error-toast";
import { cn } from "@/lib/utils";
import { createAudioSchema } from "../(main)/schema";

export function AudioForm() {
  const form = useForm<z.infer<typeof createAudioSchema>>({
    resolver: zodResolver(createAudioSchema),
    defaultValues: {
      title: "",
      text: "",
      "voice-id": "",
    },
  });

  const textToConvertLenght = form.watch("text").length;

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const pastedText = e.clipboardData.getData("text");
    const newText = form.watch("text") + pastedText;

    if (newText.length > 600) {
      e.preventDefault();
      form.setValue("text", newText.slice(0, 700));
    }
  }

  async function onSubmit(data: z.infer<typeof createAudioSchema>) {
    try {
      const payment = await createCheckout(data);
      form.reset();

      if (!payment) {
        ErrorToast({ message: "Error creating payment link" });
      }

      window.location.href = payment.url;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ErrorToast({ message: error.message });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a descriptive title for your audio"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-1">
              <FormLabel className="flex items-center justify-between">
                Text to convert
                <p
                  className={cn(
                    "text-sm font-semibold",
                    textToConvertLenght > 700 && "text-red-500",
                  )}
                >
                  {textToConvertLenght}/700
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type the message you want the AI to convert into audio"
                  className="h-40 resize-none"
                  disabled={textToConvertLenght === 700}
                  onPaste={handlePaste}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice-id"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-1">
              <FormLabel>Select voice</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl aria-label="Select a voice">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="IKne3meq5aSn9XLyUdCD">Male</SelectItem>
                    <SelectItem value="cgSgspJ2msm6clMCkdW9">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mb-3 mt-5 w-full">
          Generate Audio
        </Button>
      </form>
    </Form>
  );
}
