"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Benefits", href: "#benefits" },
  { name: "Available Languages", href: "#supported-languages" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="sticky top-0 z-10 flex w-full items-center justify-between px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Logo />

        <nav className="hidden space-x-4 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="link"
            className="p-0"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              aria-hidden={!isMenuOpen}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </motion.div>
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
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Button asChild className="w-full">
              <Link href={"#"}>Login</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
