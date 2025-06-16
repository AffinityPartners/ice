'use client'

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your privacy and medical information security are our top priorities
          </motion.p>
        </motion.div>
      </Section>

      {/* Privacy Policy Content */}
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
              { label: 'Privacy Policy', href: '/privacy-policy' }
            ]} 
          />

          <div className="prose prose-lg max-w-none">
            {/* Last Updated */}
            <div className="bg-blue-50 border-l-4 border-[#245789] p-6 mb-8 rounded-r-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Effective Date:</strong> This Privacy Policy is effective as of the date of your use of our website.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Company:</strong> ICE Tracer, LLC
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-6">
                Privacy Policy of ICE Tracer, LLC
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                This Privacy Policy is set to govern the manner in which ICE Tracer, LLC collects, uses and discloses electronic personal medical information, if approved by the user collected from the website.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                This legal document provides viable information on how the personal identifiable medical information of the user will be used, particularly in extreme emergency cases. Further, in here it is dealt with an importance your heightened awareness on how your online personal identifiable information is protected by appropriate laws governing online works.
              </p>
            </div>

            {/* Protection of Information */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Protection of Information
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  ICE Tracer, LLC has adopted safety measures to protect your personal identifiable health information whenever you sign-in. This is in pursuance of ICE Tracer, LLC's policy to better protect the privacy and confidentiality of the personal identifiable medical information.
                </p>
              </div>
            </div>

            {/* Web Browser Cookies */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                Web Browser Cookies
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whenever you sign-in as a user, we make sure that the cookies are placed in the browser file of your computer drive. This is aimed at identifying automatically your browser to our server.
                </p>
              </div>
            </div>

            {/* Your Consent */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                Your Consent
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  You freely give your assent to our Website's privacy policy, by accessing this Website.
                </p>
              </div>
            </div>

            {/* Use Comments and Submissions */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                Use Comments and Submissions
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We encourage you to post your comments or opinions, as part of our commitment on how we better improve our sites and service as well as to further strengthen our friendly relations and enhance our future business relations.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  However, if you think otherwise about the Website, it is your own discretion to discontinue the use of this Website. The ICE Tracer, LLC is not responsible for any comments that are not protected by confidentiality or proprietary rights as the same are susceptible to the third parties.
                </p>
              </div>
            </div>

            {/* Contacting Us */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                Contacting Us
              </h3>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  If you have any question pertaining to this Privacy Policy, email us at{" "}
                  <a 
                    href="mailto:support@icetracer.com" 
                    className="text-[#245789] underline hover:text-[#CA0015] transition-colors font-medium"
                  >
                    support@icetracer.com
                  </a>
                  . We will be pleased to answer your query promptly.
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-[#245789] text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
              <p className="text-lg mb-6">
                At ICE Tracer, we understand that your medical information is highly sensitive. We are committed to maintaining the highest standards of privacy and security to protect your personal health information.
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
                    For additional questions about privacy or our services, contact us at{" "}
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