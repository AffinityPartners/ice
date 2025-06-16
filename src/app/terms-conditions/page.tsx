'use client'

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { Footer } from "@/components/layout/Footer";

export default function TermsConditions() {
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
            Terms & Conditions
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Terms of Use for ICE Tracer Emergency Services
          </motion.p>
        </motion.div>
      </Section>

      {/* Terms and Conditions Content */}
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
              { label: 'Terms & Conditions', href: '/terms-conditions' }
            ]} 
          />

          <div className="prose prose-lg max-w-none">
            {/* Last Updated */}
            <div className="bg-blue-50 border-l-4 border-[#245789] p-6 mb-8 rounded-r-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Effective Date:</strong> These Terms and Conditions are effective as of the date of your use of our website.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Company:</strong> ICE Tracer, LLC
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-6">
                Terms and Conditions of ICE Tracer, LLC
              </h2>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                Introduction
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789] mb-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  By accessing our Website, you agree to be bound by the Terms and Conditions or Terms of Use pertaining to your membership services and access to this Website.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  You further agree that the Terms of Use extend on your access to the proprietary emergency information platform. You are also aware that your use of the products and services as otherwise known as ICE Tracer Emergency Services be governed by the Terms of Use.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Upon signing-up in this Website and using any of the services, you and each of your dependents if applicable accept and have read, understood and agreed to all of the necessary provisions embodied in the Terms of Use and Policy Privacy accordingly.
                </p>
              </div>
            </div>

            {/* Membership Levels */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                Membership Levels
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  This Website offers primary membership of any subscriber and dependents. Anent your membership, you will be provided with the ability to print a temporary ICE Tracer Emergency Medical Card each for you and your dependents. Once a member, you will have the ability to purchase a printed hard card for $5 in your account for each member.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The ICE Tracer, LLC as part of improving its services to the membership at large, it may release from time to time additional essential and excellent services. For any ailment of premium services, the subscriber may be required completion of an enrollment form.
                </p>
              </div>
            </div>

            {/* Responsibility of the Subscriber's Public Health Information */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                Responsibility of the Subscriber's Public Health Information
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  As our valued member, you are freely in control of your personal health profile. The extent of your access on our website involves maintaining your lifelong record of all your medical information as well as adding pertinent information and deleting unnecessary files.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With respect to the ICE Tracer Emergency Medical Card, it is the primary responsibility of the subscriber to take proper diligence in protecting the possession of and access of it. Protection against an authorized use of the card and ID is the sole obligation of the subscriber.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Privacy
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  With respect to the subscriber's personal information, ICE Tracer, LLC must make reasonable efforts to prevent the loss, misuse or alteration. Its Policy Privacy is also found in this Website, which forms part of these Terms of Use. In the case that there is an inconsistency between the Terms of Use and the Privacy Policy, the former governs the latter.
                </p>
              </div>
            </div>

            {/* Term of Membership */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                Term of Membership
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The term of the Terms of Use is one year reckoned from the date of the approval of your subscriber application by ICE Tracer, LLC. After the one-year term, it will be automatically renewed for an additional one (1) year unless the subscriber notifies the ICE Tracer not to renew for known reasons.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Should you wish to unsubscribe to ICE Tracer Emergency Services send an email to{" "}
                  <a 
                    href="mailto:support@icetracer.com" 
                    className="text-[#245789] underline hover:text-[#CA0015] transition-colors font-medium"
                  >
                    support@icetracer.com
                  </a>
                  . Subscriber agrees to pay promptly on required payments of membership on either monthly or annual basis as indicated during the enrollment process.
                </p>
              </div>
            </div>

            {/* Use of the Subscriber's Personal health Information */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM6 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM9 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM12 8a2 2 0 012-2v9a2 2 0 01-2-2V8zM15 8a2 2 0 012-2v9a2 2 0 01-2-2V8z" clipRule="evenodd" />
                  </svg>
                </div>
                Use of the Subscriber's Personal Health Information
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  ICE Tracer, LLC gathers generic information from the subscriber pertaining to the usage of the ICE Tracer Emergency Services, intended for the services sought by all other subscribers. ICE Tracer, LLC is authorized by the subscriber to share such general information to its agents and its employees.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Personal Health Information of the subscriber remains confidential to any member registered on the ICE Tracer Emergency Services, unless otherwise authorized by the subscriber. You fully consent to share your electronic health profile created through the use of universally established medical structure to a third party, as expressly stated in the ICE Tracer Emergency Services card.
                </p>
              </div>
            </div>

            {/* Limitation of liability */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                Limitation of Liability
              </h3>
              
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  As a limited liability company, you acknowledge and fully accept that ICE Tracer, LLC has a genuine interest in limiting the officers and employees personal liabilities in the rendering of their professional services.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In no case shall ICE Tracer, LLC be accountable to you either by laws of contract or torts, any party enrolled for service or any unauthorized third-party user for any direct, indirect, special, consequential, incidental or punitive damages, as a result of unauthorized access of your account or another breach of security, without limiting loss of profits.
                </p>
              </div>
            </div>

            {/* Early Termination */}
            <div className="mb-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                Early Termination
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  In no case shall subscriber be released from remaining payment obligations or entitled to a refund of any membership dues when subscriber terminates membership before the one-year anniversary of the membership.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  ICE Tracer, LLC reserves the right to terminate contractual agreement with the subscriber at any time due to the following reasons:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-4">
                  <li>Subscriber fails to show interest to comply the Terms of Use</li>
                  <li>ICE Tracer, LLC complying with the demand of the law to discontinue the ICE Tracer Emergency Services</li>
                  <li>ICE Tracer, LLC ends to offer its Services</li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Under these Terms of Use, early termination will not terminate subscriber's contractual obligations. The subscriber may receive a pro-rata refund for the outstanding portion of the subscription as well as any advance payment for services.
                </p>
              </div>
            </div>

            {/* Law and Jurisdiction */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                </div>
                Law and Jurisdiction
              </h3>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed">
                  These Terms of Use shall be construed in accordance with and be governed by the laws of the State of Texas without reference to its conflict of laws principles. The proper courts in the State of Texas, United States of America shall have exclusive jurisdiction over the controversies arising out in violations of the contract and torts laws in connection with the use of this Website or use of the Services.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                Questions or Concerns
              </h3>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#245789]">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms and Conditions, please contact us at{" "}
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

            {/* Copyright Notice */}
            <div className="bg-[#245789] text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Agreement Acknowledgment</h3>
              <p className="text-lg mb-6">
                By using ICE Tracer Emergency Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Your use of our services constitutes acceptance of these terms.
              </p>
              <div className="space-y-4">
                <a 
                  href="/" 
                  className="inline-block bg-[#CA0015] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#a8000f] transition-colors mr-4 shadow-md hover:shadow-lg"
                >
                  Get ICE Tracer Today
                </a>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/90">
                    <strong>Copyright © 2024 ICE Tracer, LLC</strong><br />
                    All Rights Reserved
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