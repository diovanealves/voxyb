import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/services/auth";
import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <SidebarProvider>
      <MainSidebar user={session?.user} />
      <main className="w-full">
        <SidebarTrigger className="absolute ml-1 mt-2" />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
