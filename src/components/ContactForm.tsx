'use client';

import { useState } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');


    const form = new FormData();
    form.append('access_key', process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY || '');
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setResponseMessage('Message sent successfully!');
      } else {
        setStatus('error');
        setResponseMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className=" md:py-8 py-6  custom-background">
    <div className="px-[16px] md:px-[0px] w-full mx-auto mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="md:text-3xl text-xl  font-bold text-center text-white md:mb-6 mb-4">Contact Us</h1>
        <p className="text-center text-white md:mb-10 mb-6  text-xs md:text-sm">
          We'd love to hear from you! Fill out the form below and we'll get back to you soon.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-xl">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-black flex items-center justify-center">
                  <FiCheckCircle className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Thanks for contacting us!</h3>
                <p className="text-white">{responseMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 bg-black text-white  hover:bg-black transition"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 md:text-sm text-xs pr-4 py-3 w-full border border-gray-300 rounded-lg"
                      placeholder="ali wajdan"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-3 md:text-sm text-xs w-full border border-gray-300 rounded-lg"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute top-3 left-3 text-gray-400" />
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg"
                      placeholder="Write your message..."
                    />
                  </div>
                </div>

                {/* Response */}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 font-medium"
                  >
                    {responseMessage}
                  </motion.p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex justify-center md:text-sm text-xs items-center gap-2 bg-black text-white py-3  hover:bg-black transition-all"
                >
                  {status === 'sending' ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default ContactForm;
