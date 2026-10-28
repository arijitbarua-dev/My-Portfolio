import React from "react";
import { getSession } from "@/lib/auth-server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If user is not authenticated and not already on the login page:
  // Note: in Next.js App Router, routes under /admin/login/page.tsx will have their own nested layout or we can bypass here:
  // Let's check headers or allow login route to render.
  // Actually, we can check if session exists. If not, we can render the login route or check path.
  // In Next.js App Router, layout wraps all child pages including /admin/login.
  // To avoid circular redirect on /admin/login, we can check if children is login or handle login inside /admin/login/layout.tsx or conditionally render.
  // Even better: if no session, we render children if it's the login page, or redirect to /admin/login.
  // Let's check using headers() or render children if no session (the login page will render, and inside other pages we check session).
  // Or: Let's create an auth guard wrapper!

  return (
    <div className="min-h-screen bg-[#FFFBEA] text-[#111111] flex flex-col antialiased">
      {session?.user ? (
        <div className="flex flex-1">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AdminHeader userEmail={session.user.email} />
            <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          {children}
        </div>
      )}
    </div>
  );
}
