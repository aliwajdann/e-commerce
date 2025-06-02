// // app/admin/page.tsx

// import { auth } from "@clerk/nextjs/server";
// import { useUser } from '@clerk/nextjs'

// const { user, isSignedIn } = useUser()


// export default async function AdminPage() {
//   const { userId } = auth();

//   if (!userId) {
//     return <div className="p-6 text-center text-red-500">Please sign in to access admin dashboard</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>
//       {/* Add more here */}
//     </div>
//   );
// }
