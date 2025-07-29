import { currentUser } from "@clerk/nextjs/server";

const adminEmails = [
  "aliwajdan.it@gmail.com",
  "mominabbasminhas5@gmail.com",
];

export default async function Page() {
  const user = await currentUser();

  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!user || !userEmail || !adminEmails.includes(userEmail)) {
    return <div>🚫 Access Denied</div>;
  }

  return <div className="mt-20">Welcome to the Admin Dashboard 🛡️</div>;
}
