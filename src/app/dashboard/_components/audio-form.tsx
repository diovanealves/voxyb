"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";

import {
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

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useTour } from "@reactour/tour";
import { useEffect } from "react";
import { createAudioSchema } from "../(main)/schema";
import { AudioConfirmationDialog } from "./audio-confirmation-dialog";
import { SheetSupportedLanguages } from "./sheet-supported-languages";

export function AudioForm() {
  const form = useForm<z.infer<typeof createAudioSchema>>({
    resolver: zodResolver(createAudioSchema),
    defaultValues: {
      title: "",
      text: "",
      "voice-id": "",
    },
  });
  const { setIsOpen } = useTour();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");

    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  });

  const textToConvertLenght = form.watch("text").replace(/\s/g, "").length;

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const currentText = form.watch("text");
    const newText = currentText + pastedText;
    const textWithoutSpaces = newText.replace(/\s/g, "");

    if (textWithoutSpaces.length > 700) {
      let truncatedText = newText;
      while (truncatedText.replace(/\s/g, "").length > 700) {
        truncatedText = truncatedText.slice(0, -1);
      }
      form.setValue("text", truncatedText);
    } else {
      form.setValue("text", newText);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const currentText = form.watch("text");
    const textWithoutSpaces = currentText.replace(/\s/g, "");

    if (
      textWithoutSpaces.length >= 700 &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }
  }

  return (
    <FormProvider {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Choose a title to easily find this audio later"
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
            <>
              <FormItem className="mt-3 space-y-1">
                <FormLabel className="flex items-center justify-between">
                  Text to convert
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      textToConvertLenght >= 700 && "text-red-500",
                    )}
                  >
                    {textToConvertLenght}/700
                  </p>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type the message you want the AI to convert into audio"
                    className={cn(
                      "h-40 resize-none",
                      textToConvertLenght >= 700 && "border-red-500",
                    )}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
              <SheetSupportedLanguages />
            </>
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
                  <SelectTrigger {...field}>
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

        <FormField
          control={form.control}
          name="languagesConfirmed"
          render={({ field }) => (
            <FormItem className="mt-3 space-y-1">
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-md"
                  />
                </FormControl>
                <FormLabel className="mt-0">
                  I have seen the supported languages
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <AudioConfirmationDialog />
      </form>
    </FormProvider>
  );
}
