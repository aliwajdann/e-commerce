import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

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

  return(
   <div className="px-[2%] py-[5%]">
    <p>Welcome to the Admin Dashboard 🛡️</p>
    <p>Sunao Admin bhai</p>
    <div className="my-5 flex flex-col md:flex-row gap-2">
    <Link href="admin/products" className="px-10 py-3 bg-purple-700 text-white">Products</Link>
    <Link href="admin/orders" className="px-10 py-3 bg-purple-700 text-white">Orders</Link>
    <Link href="admin/cartactivity" className="px-10 py-3 bg-purple-700 text-white">Cart Tracking</Link>
    </div>
    
    </div>
  )
}
