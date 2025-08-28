"use client"
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  // Footer links data
  const footerSections = [
    {
      title: 'CUSTOMER CARE',
      links: [
        { name: 'Delivery Details', href: '/delivery-details' },
        { name: 'Returns', href: '/returns' },
        { name: 'Help & FAQs', href: '/help-faqs' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Store Locator', href: '/store-locator' },
        { name: 'Gift Wrap Service', href: '/gift-wrap' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Under 26 and Student Discount', href: '/student-discount' },
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'On Instagram', href: '/instagram' },
        { name: 'Inclusivity and Equality', href: '/inclusivity' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Code of Ethics', href: '/code-of-ethics' },
        { name: 'Affiliates', href: '/affiliates' },
      ]
    },
    {
      title: 'TERMS & POLICIES',
      links: [
        { name: 'Ordering & Payment', href: '/ordering-payment' },
        { name: 'Terms & Conditions', href: '/terms-conditions' },
        { name: 'Security & Privacy', href: '/security-privacy' },
        { name: 'Cookies', href: '/cookies' },
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: '📘' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { name: 'TikTok', href: 'https://tiktok.com', icon: '🎵' },
    { name: 'YouTube', href: 'https://youtube.com', icon: '📺' },
  ];

  // Payment methods
  const paymentMethods = [
    { name: 'Apple Pay', logo: '🍎' },
    { name: 'Diners Club', logo: '💳' },
    { name: 'Discover', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'PayPal', logo: '💙' },
    { name: 'Visa', logo: '💳' },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <footer id="footer" className="bg-white border-t border-gray-200 pt-8 md:pt-12 lg:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile: Newsletter First, Desktop: Original Layout */}
        <div className="block md:hidden">
          {/* Mobile Newsletter Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="max-w-md mx-auto text-center space-y-6">
              <p className="text-xs text-gray-700 leading-relaxed px-4">
                With its beautiful details, soft fabrics and unique styles, the Velano lingerie is perfect for 
                embracing the underwear-as-outerwear trend...
              </p>
              
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900 tracking-wide">
                  CONNECT WITH US
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  And receive an exclusive 10% off your order, exclusively on www.velanoshop.store
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-3 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 text-xs font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    JOIN
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile Collapsible Sections */}
          <div className="space-y-1">
            {footerSections.map((section, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full py-4 px-2 text-left flex items-center justify-between"
                >
                  <h3 className="text-xs font-semibold text-gray-900 tracking-wide">
                    {section.title}
                  </h3>
                  <span className="text-gray-600 text-lg">
                    {openSections[index] ? '−' : '+'}
                  </span>
                </button>
                
                {openSections[index] && (
                  <div className="pb-4 px-2">
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link 
                            href={link.href}
                            className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Bottom Section */}
          <div className="pt-6 space-y-6 text-center">
            {/* Currency Selector */}
            {/* <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">🇪🇺</span>
              </div>
              <span className="text-xs text-gray-700">Europe (EUR)</span>
              <button className="text-xs text-gray-600 hover:text-gray-900 underline">
                Change
              </button>
            </div> */}

            {/* Social Media Links */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <span className="text-xs">{social.icon}</span>
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex justify-center items-center space-x-3">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs"
                  title={method.name}
                >
                  {method.logo}
                </div>
              ))}
            </div>

            {/* Copyright */}
            <div className="space-y-2 text-xs text-gray-500">
              <p>
                © 2025 Velano. E-commerce by{' '}
                <Link href="#" className="hover:text-gray-700">
                  Me
                </Link>
              </p>
              <p>
                {/* Velano® is a registered trademark of Velano Ltd. Registered company 05566892. */}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-3 md:space-y-4">
                <h3 className="text-xs md:text-base font-semibold text-gray-900 tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-xs md:text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Signup */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xs md:text-base font-semibold text-gray-900 tracking-wide">
                CONNECT WITH US
              </h3>
              <p className="text-xs md:text-xs text-gray-600 leading-relaxed">
                And receive an exclusive 10% off your order, exclusively on www.velanoshop.store
              </p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 text-xs font-medium hover:bg-gray-800 transition-colors duration-200 min-w-[80px]"
                >
                  JOIN
                </button>
              </form>

              {/* Social Media Links */}
              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-8 h-8 md:w-9 md:h-9 bg-black text-white flex items-center justify-center rounded hover:bg-gray-800 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <span className="text-xs">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Bottom Section */}
          <div className="border-t border-gray-200 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-4">
              {/* Currency Selector */}
              {/* <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs">🇪🇺</span>
                </div>
                <span className="text-xs text-gray-700">Europe (EUR)</span>
                <button className="text-xs text-gray-600 hover:text-gray-900 underline">
                  Change
                </button>
              </div> */}

              {/* Payment Methods */}
              <div className="flex items-center space-x-2 md:space-x-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="w-8 h-5 md:w-10 md:h-6 bg-gray-100 rounded flex items-center justify-center text-xs"
                    title={method.name}
                  >
                    {method.logo}
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="space-y-2 text-xs md:text-xs text-gray-500">
              <p>
                © 2025 Velano. E-commerce by{' '}
                <Link href="#" className="hover:text-gray-700">
                  Me
                </Link>
              </p>
              <p>
                {/* Velano® is a registered trademark of  Ltd. Registered company 05566892. */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
