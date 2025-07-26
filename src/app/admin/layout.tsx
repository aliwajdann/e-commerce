import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const adminEmails = ["aliwajdan.it@gmail.com", "mominabbasminhas5@gmail.com"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  const email = user?.emailAddresses[0]?.emailAddress;

  if (!user || !email || !adminEmails.includes(email)) {
    return redirect("/"); // or show custom Access Denied UI
  }

  return <>{children}</>;
}
