import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminChrome } from "@/components/admin/admin-chrome";
import { newsletterFontClassName } from "@/lib/newsletter-fonts";

export default async function AdminArtigosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <AdminChrome userEmail={session.user.email} currentSection="artigos">
      <div className={newsletterFontClassName}>{children}</div>
    </AdminChrome>
  );
}
