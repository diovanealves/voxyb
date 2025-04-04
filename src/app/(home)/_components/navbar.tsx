"use client";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { navbarLinkData } from "@/data/navbarLinkData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="sticky top-0 z-10 flex w-full items-center justify-between px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Logo />

        <nav className="hidden space-x-4 md:flex">
          {navbarLinkData.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <ModeToggle />
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <ModeToggle />
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={cn("transition-transform, duration-300 ease-in-out")}
          >
            {isMenuOpen ? (
              <XIcon className="w-6, h-6 rotate-180 transform" />
            ) : (
              <MenuIcon className="w-6, h-6 rotate-0 transform" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="absolute z-50 w-full pb-4 backdrop-blur-3xl md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="w-full space-y-1 px-4 py-2">
            {navbarLinkData.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Button asChild className="mt-4 w-full">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
