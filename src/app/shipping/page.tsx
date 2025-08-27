export default function ShippingPage() {
  return (
    <div className="custom-background h-[70vh]">
    <div className="max-w-4xl mx-auto px-4 py-10 ">
      <h1 className="md:text-3xl text-xl text-white font-bold mb-4">Shipping Information</h1>
      <ul className="list-disc pl-5 space-y-2 text-white text-lg">
        <li className="text-xs md:text-sm">We ship all over Pakistan via trusted courier services.</li>
        <li className="text-xs md:text-sm">Orders are processed within 24 hours.</li>
        <li className="text-xs md:text-sm">Delivery time: 2–5 business days.</li>
        <li className="text-xs md:text-sm">You’ll receive a tracking number once your order is shipped.</li>
        {/* <li>Shipping is <strong>free</strong> on all orders!</li> */}
      </ul>
    </div>
    </div>
  );
}
