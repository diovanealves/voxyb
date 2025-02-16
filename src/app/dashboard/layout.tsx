import { PropsWithChildren } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { MainSidebar } from "./_components/main-sidebar";

import { AuthProvider } from "@/providers/auth-provider";
import { auth } from "@/services/auth";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <AuthProvider session={session}>
      <SidebarProvider>
        <MainSidebar user={session?.user} />
        <main className="w-full">
          <SidebarTrigger className="absolute ml-1 mt-2" />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  );
}
