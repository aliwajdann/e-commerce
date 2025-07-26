import { currentUser } from "@clerk/nextjs/server";

const adminEmails = [
  "aliwajdan.it@gmail.com",
  "yourcousin@example.com",
  "someoneelse@trusted.com",
];

export default async function Page() {
  const user = await currentUser();

  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!user || !userEmail || !adminEmails.includes(userEmail)) {
    return <div>🚫 Access Denied</div>;
  }

  return <div>Welcome to the Admin Dashboard 🛡️</div>;
}
