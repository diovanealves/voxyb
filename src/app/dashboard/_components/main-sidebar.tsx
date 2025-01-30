"use client";

import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  GlobeIcon,
  HeadphonesIcon,
  HelpCircleIcon,
  HomeIcon,
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { UserDropdown } from "./user-dropdown";

type MainSidebarProps = {
  user: Session["user"];
};

export function MainSidebar({ user }: MainSidebarProps) {
  const { setOpenMobile } = useSidebar();

  if (!user) return null;

  const handleSidebarClose = () => setOpenMobile(false);

  return (
    <Sidebar>
      <SidebarContent className="mx-2 my-3">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleSidebarClose}>
                  <Link href="/dashboard">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild onClick={handleSidebarClose}>
                  <Link href="/dashboard/audios">
                    <HeadphonesIcon className="mr-2 h-4 w-4" />
                    <span> Generated Audios</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Additional Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleSidebarClose}>
                  <Link href="/">
                    <GlobeIcon className="mr-2 h-4 w-4" />
                    <span>Website</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild onClick={handleSidebarClose}>
                  <Link href="/dashboard/help">
                    <HelpCircleIcon className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <UserDropdown user={user} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
