"use client";

import { NavMain } from "@/components/nav-main";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sections as sidebarSections } from "@/lib/sections";
import { searchSections } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const sections = searchSections(sidebarSections.navMain, searchQuery);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                {/* eslint-disable-next-line  */}
                <img src="/arg-icon.svg" className="h-8 rounded" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Argentina al dia
                  </span>
                  <span className="truncate text-xs">Datos públicos</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarInput
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sections} />
      </SidebarContent>
      <SidebarFooter>{/* <StarButton /> */}</SidebarFooter>
    </Sidebar>
  );
}
