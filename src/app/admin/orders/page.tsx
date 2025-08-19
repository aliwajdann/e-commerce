// app/admin/orders/page.tsx

// import { currentUser } from "@clerk/nextjs/server";
import { getOrders } from "@/lib/getOrders";

export default async function AdminOrdersPage() {
  const orders: any[] = await getOrders();
  
// const user = await currentUser();

// if (!user || user.emailAddresses[0].emailAddress !== "aliwajdan.it@gmail.com" || "mominabbasminhas5@gmail.com") {
//   return <div>🚫 Access Denied</div>;
// }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Orders Dashboard</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
               <th className="p-3">Subtotal</th>
<th className="p-3">Delivery</th>
<th className="p-3">Total</th>

                <th className="p-3">Status</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer?.name}</td>
                  <td className="p-3">{order.customer?.phone}</td>
                  <td className="p-3">{order.customer?.address}</td>
                 <td className="p-3">Rs {order.subtotal ?? "N/A"}</td>
<td className="p-3">
  {order.deliveryFee === 0
    ? "Free"
    : `Rs ${order.deliveryFee}`}
</td>
<td className="p-3 font-semibold">Rs {order.total}</td>

                  <td className="p-3 capitalize text-yellow-600">{order.status}</td>
                  <td className="p-3">
                    {order.createdAt?.toDate?.().toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
