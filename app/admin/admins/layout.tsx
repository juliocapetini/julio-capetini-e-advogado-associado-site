import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminChrome } from "@/components/admin/admin-chrome";

export default async function AdminAdminsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <AdminChrome userEmail={session.user.email} currentSection="admins">
      {children}
    </AdminChrome>
  );
}
