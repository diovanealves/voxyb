import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { languagesData } from "@/data/languaguesData";
import { LanguagesIcon } from "lucide-react";

export function SheetSupportedLanguages() {
  return (
    <div className="mt-3 inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="link"
            className="group flex h-auto items-center gap-1.5 p-0 text-xs font-normal"
          >
            <LanguagesIcon className="h-3.5 w-3.5 animate-bounce transition-colors duration-200" />
            <span>Supported languages</span>
            <span className="animate-pulse text-[10px] text-primary/70 transition-colors duration-200">
              (click to view)
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Supported Languages</SheetTitle>
            <SheetDescription>
              Our text-to-speech service supports 32 languages. Here&apos;s the
              complete list:
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            {languagesData.map((language) => (
              <div
                key={language.name}
                className="rounded-md bg-muted/50 p-2 text-sm"
              >
                {language.name}
              </div>
            ))}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="mt-4 w-full">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
