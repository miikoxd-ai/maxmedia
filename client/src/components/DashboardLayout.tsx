import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { FileText, Globe, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

const menuItems = [
  { icon: Globe, label: "Public site", path: "/" },
  { icon: FileText, label: "Content editor", path: "/admin" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading, user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#101014] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Admin access</p>
          <h1 className="mt-4 text-3xl font-semibold">Sign in to edit the website.</h1>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            The website editor is protected. Continue through the existing sign-in flow to update the homepage copy and links.
          </p>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            className="mt-6 w-full rounded-full bg-red-600 text-white hover:bg-red-500"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-white/10 bg-[#0b0b0f] text-white">
        <SidebarHeader className="border-b border-white/10 px-4 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Max Media</p>
          <h2 className="mt-2 text-lg font-semibold">Website controls</h2>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4">
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = location === item.path;
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => setLocation(item.path)}
                    className="h-11 rounded-xl text-sm"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-white/10 p-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-white/10">
                <AvatarFallback className="bg-red-600 text-white">
                  {user.name?.charAt(0).toUpperCase() || "M"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{user.name || "Authenticated user"}</p>
                <p className="truncate text-xs text-zinc-400">{user.email || "No email available"}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => logout()}
              className="mt-4 w-full rounded-xl border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-[radial-gradient(circle_at_top,rgba(127,29,29,0.28),transparent_35%),linear-gradient(180deg,#050505_0%,#0b0b0f_100%)]">
        <main className="min-h-screen p-4 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
