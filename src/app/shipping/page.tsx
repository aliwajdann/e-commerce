export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
      <ul className="list-disc pl-5 space-y-2 text-gray-700 text-lg">
        <li>We ship all over Pakistan via trusted courier services.</li>
        <li>Orders are processed within 24 hours.</li>
        <li>Delivery time: 2–5 business days.</li>
        <li>You’ll receive a tracking number once your order is shipped.</li>
        <li>Shipping is <strong>free</strong> on all orders!</li>
      </ul>
    </div>
  );
}
