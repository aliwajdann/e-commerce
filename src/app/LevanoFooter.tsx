const LevanoFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand/Logo */}
        <div>
          <h2 className="text-xl font-bold">Velano</h2>
          <p className="text-sm mt-2 text-gray-400">
            Your trusted fashion brand — quality meets style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {/* <li><a href="/" className="hover:text-white">Home</a></li> */}
            {/* <li><a href="/shop" className="hover:text-white">Shop</a></li> */}
            <li><a href="/about" className="hover:text-white">About</a></li>
            {/* <li><a href="/contact" className="hover:text-white">Contact</a></li> */}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="font-semibold mb-3">Customer Help</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {/* <li><a href="/faq" className="hover:text-white">FAQs</a></li> */}
            <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
            <li><a href="/returns" className="hover:text-white">Return Policy</a></li>
            {/* <li><a href="/track-order" className="hover:text-white">Track Your Order</a></li> */}
          </ul>
        </div>

        {/* Social Icons / Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Stay Connected</h3>
          <div className="flex gap-4 mb-4">
            <a href="https://www.instagram.com/velano.pk/" target="_blank" className="hover:text-pink-400">Instagram</a>
            <a href="https://wa.me/+923240059011" target="_blank" className="hover:text-green-400">WhatsApp</a>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Velano. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LevanoFooter;
