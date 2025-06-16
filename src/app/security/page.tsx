'use client'

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { Footer } from "@/components/layout/Footer";

export default function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <Section background="blue" padding="lg" animate>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Security
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your data security and privacy are our highest priorities
          </motion.p>
        </motion.div>
      </Section>

      {/* Security Content */}
      <Section background="white" animate separator>
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: 'Security', href: '/security' }
            ]} 
          />

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="bg-blue-50 border-l-4 border-[#245789] p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                At ICE Tracer, we prioritize the security and privacy of our customers' information. We implement stringent measures to ensure your data is protected at all times.
              </p>
            </div>

            {/* Data Encryption */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Data Encryption
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  All sensitive information stored in our QR codes and NFC tags is encrypted using advanced encryption standards. This ensures that only authorized personnel can access your medical data in an emergency.
                </p>
              </div>
            </div>

            {/* Secure Website */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                Secure Website
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our website is protected with SSL (Secure Sockets Layer) encryption, which safeguards your personal and payment information during online transactions. Look for the padlock symbol in your browser's address bar to confirm you are on a secure page.
                </p>
              </div>
            </div>

            {/* Privacy Protection */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Privacy Protection
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are committed to maintaining your privacy. We do not share your personal information with third parties without your explicit consent, except as required by law or necessary to provide our services.
                </p>
              </div>
            </div>

            {/* Access Control */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Access Control
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Access to your medical information is restricted to authorized first responders and medical personnel. Our QR codes and NFC tags are designed to provide quick access in emergencies while maintaining the highest level of security.
                </p>
              </div>
            </div>

            {/* Regular Audits */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                Regular Audits
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We conduct regular security audits and assessments to identify and address potential vulnerabilities. Our commitment to ongoing security improvements ensures that your data remains protected against evolving threats.
                </p>
              </div>
            </div>

            {/* Customer Responsibility */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                Customer Responsibility
              </h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  While we take extensive measures to secure your information, we also encourage you to take steps to protect your data:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>Keep your login credentials confidential</li>
                  <li>Regularly update your account information</li>
                  <li>Contact us immediately if you suspect any unauthorized access to your account</li>
                </ul>
              </div>
            </div>

            {/* Contact Us */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                Contact Us
              </h3>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  If you have any questions or concerns about our security measures, please contact our support team:
                </p>
                <div className="space-y-2 text-lg text-gray-700">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a 
                      href="mailto:support@icetracer.com" 
                      className="text-[#245789] underline hover:text-[#CA0015] transition-colors font-medium"
                    >
                      support@icetracer.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a 
                      href="tel:+18002134803" 
                      className="text-[#245789] underline hover:text-[#CA0015] transition-colors font-medium"
                    >
                      (800) 213-4803
                    </a>
                  </p>
                  <p><strong>Business Hours:</strong> Monday – Friday, 9 AM – 5 PM (EST)</p>
                </div>
              </div>
            </div>

            {/* Security Commitment */}
            <div className="bg-[#245789] text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Security Commitment</h3>
              <p className="text-lg mb-6">
                We are dedicated to providing a secure and trustworthy service. Your peace of mind is our top priority. Trust ICE Tracer to keep your medical information safe and accessible when you need it most.
              </p>
              <div className="space-y-4">
                <a 
                  href="/" 
                  className="inline-block bg-[#CA0015] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#a8000f] transition-colors mr-4 shadow-md hover:shadow-lg"
                >
                  Get ICE Tracer Today
                </a>
                <div className="mt-4">
                  <p className="text-sm text-white/90">
                    Questions about security? Contact us at{" "}
                    <a href="mailto:support@icetracer.com" className="text-white underline hover:text-white/80 transition-colors">
                      support@icetracer.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 