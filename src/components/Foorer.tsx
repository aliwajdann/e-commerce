"use client";
import React, { useState } from 'react';

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-black text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* TALK TO US */}
          <div className="lg:col-span-2">
            <button 
              className="md:hidden flex justify-between items-center w-full text-left"
              onClick={() => toggleSection('talk')}
            >
              <h3 className="text-lg font-semibold md:pb-0 pb-1.5">TALK TO US</h3>
              {/* <span className="text-xl">
                {openSection === 'talk' ? '−' : '+'}
              </span> */}
            </button>
            <h3 className="text-lg font-semibold mb-4 hidden md:block">TALK TO US</h3>
            {/* <ul className={`space-y-2 ${openSection === 'talk' ? 'block' : 'hidden'} md:block`}> */}
            <ul className={`space-y-2 block`}>
              <li>Whatsapp: +92 3240059011</li>
              <li>Phone: 03240059011</li>
              <li>Email: aliwajdan.it@gmail.com</li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <button 
              className="md:hidden flex justify-between items-center w-full text-left"
              onClick={() => toggleSection('account')}
            >
              <h3 className="text-lg font-semibold">ACCOUNT</h3>
              <span className="text-xl">
                {openSection === 'account' ? '−' : '+'}
              </span>
            </button>
            <h3 className="text-lg font-semibold mb-4 hidden md:block">ACCOUNT</h3>
            <ul className={`space-y-2 ${openSection === 'account' ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="hover:text-white transition-colors">Account Login</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* SHOPPING GUIDE */}
          <div>
            <button 
              className="md:hidden flex justify-between items-center w-full text-left"
              onClick={() => toggleSection('shopping')}
            >
              <h3 className="text-lg font-semibold">SHOPPING GUIDE</h3>
              <span className="text-xl">
                {openSection === 'shopping' ? '−' : '+'}
              </span>
            </button>
            <h3 className="text-lg font-semibold mb-4 hidden md:block">SHOPPING GUIDE</h3>
            <ul className={`space-y-2 ${openSection === 'shopping' ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Boadmay Payment Gateway</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchange Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Process</a></li>
            </ul>
          </div>

          {/* ABOUT THE BRAND */}
          <div>
            <button 
              className="md:hidden flex justify-between items-center w-full text-left"
              onClick={() => toggleSection('about')}
            >
              <h3 className="text-lg font-semibold">ABOUT THE BRAND</h3>
              <span className="text-xl">
                {openSection === 'about' ? '−' : '+'}
              </span>
            </button>
            <h3 className="text-lg font-semibold mb-4 hidden md:block">ABOUT THE BRAND</h3>
            <ul className={`space-y-2 ${openSection === 'about' ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback Form</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Complaint Form</a></li>
            </ul>
          </div>

          {/* NEWSLETTER SIGN UP */}
          <div className="md:col-span-2 lg:col-span-1">
            {/* <button 
              className="md:hidden flex justify-between items-center w-full text-left"
              onClick={() => toggleSection('newsletter')}
            > */}
              <h3 className="text-lg font-semibold md:pb-0 pb-1.5">NEWSLETTER SIGN UP</h3>
              {/* <span className="text-xl">
                {openSection === 'newsletter' ? '−' : '+'}
              </span> */}
            {/* </button> */}
            {/* <h3 className="text-lg font-semibold mb-4 hidden md:block">NEWSLETTER SIGN UP</h3> */}
            {/* <div className={`${openSection === 'newsletter' ? 'block' : 'hidden'} md:block`}> */}
            <div className={`block`}>
              <p className="mb-4 text-sm">
                Sign up for exclusive updates, new arrivals & insider only discounts
              </p>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="enter your email address" 
                  className="px-4 py-2 border border-gray-600 bg-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-white placeholder-gray-400"
                />
                <button 
                  type="submit" 
                  className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors font-medium"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>© 2025 Nexwear. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;