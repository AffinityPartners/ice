'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video Background - Enhanced */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/ICE-Tracer-Video-optimized.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 z-10"></div>

        {/* Hero Content with animations */}
        <motion.div 
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
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
            Dynamic Medical Emergency ID Solution
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-white/95 mb-10 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ICE Tracer is an advanced medical ID system that offers a seamless way to store, manage, and access your and your family&apos;s vital health information securely anytime, anywhere in the event of an emergency.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="text-xl px-10 py-5">
              SIGN UP TODAY
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Blue Banner Section - Enhanced */}
      <Section background="blue" padding="md" animate>
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Immediate Access to Lifesaving Health Information{" "}
          <span className="text-red-400">24/7</span>
        </motion.h2>
      </Section>

      {/* Your Health Always Within Reach Section - Enhanced */}
      <Section background="white" animate>
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#245789] mb-8 leading-tight">
              Your Health, Always Within Reach
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-10 leading-relaxed">
              In emergencies, every second counts. ICE Tracer is a revolutionary cloud-based service that securely stores your comprehensive medical profile, making it instantly accessible to First Responders through ID cards or wearable devices. With ICE Tracer, your critical health information is always at hand, providing peace of mind when you can&apos;t communicate.
            </p>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-8">
                Why Choose ICE Tracer?
              </h3>
              
              <motion.div 
                className="space-y-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-base">
                      <span className="text-[#CA0015]">Security</span> - Your data is stored with the highest level of encryption, ensuring your privacy and security are never compromised.
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-base">
                      <span className="text-[#CA0015]">Accessibility</span> - First Responders can access your medical profile quickly and easily, making it simpler to provide accurate and timely care.
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-base">
                      <span className="text-[#CA0015]">Convenience</span> - Our wearable devices and ID cards are designed for everyday use, blending seamlessly with your daily routine while providing essential protection.
                    </h4>
                  </div>
                </div>
              </motion.div>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Your medical profile can be accessed through a wearable device or ID card, giving First Responders access to your medical history anytime, anywhere. Keep your profile up to date with unlimited changes available, as your medical history can change at any time.
              </p>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="lg:order-last flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <OptimizedImage
                src="/images/ICE-Tracer-er-visit.png"
                alt="Medical emergency room visit with first responders"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission Statement Banner - Enhanced */}
      <Section background="blue" padding="md" animate>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed text-center font-medium max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our mission is to provide individuals with the ability to access and store their medical information in the{" "}
          <span className="text-red-400 font-bold">quickest and safest</span> manner possible, ensuring that their medical history is available{" "}
          <span className="text-red-400 font-bold">anytime, anywhere</span>.
        </motion.p>
      </Section>

      {/* Easily Update Medical Profiles Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Device Mockups */}
            <div className="relative">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/ICE-Profile-Image-2024-HQ.png"
                  alt="ICE Tracer medical profile interface"
                  width={800}
                  height={600}
                  className="w-full h-auto max-w-2xl"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-6">
                Easily Update Medical Profiles
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                Keep your profile up to date with unlimited changes, ensuring First Responders and health care providers have the most current information anytime, anywhere.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-[#CA0015]">Health Record Management:</span> Create & update unlimited medical information
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                                     <div>
                     <span className="font-semibold text-[#CA0015]">Dependents:</span> Add and manage family member profiles from a single account
                   </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-[#CA0015]">Privacy:</span> Choose which medical details should display on public accessed profiles
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-[#CA0015]">Multiple Product Linking:</span> Connect multiple devices to each profile
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#CA0015] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-[#CA0015]">Share Information:</span> Conveniently share your profile with healthcare providers
                  </div>
                </div>
              </div>

              <Button size="lg" className="px-10">
                COMPARE PLANS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How ICE Tracer Works Section - Enhanced */}
      <Section background="white" animate>
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#245789] mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How ICE Tracer Works
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-16">
          {/* Step 1 */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-24 h-24 bg-[#245789] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                <path d="M15 7a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-[#245789] mb-6">Create Your Profile</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              Sign up and create your detailed medical profile, including essential information such as allergies, medications, medical conditions, emergency contacts, and much more.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-24 h-24 bg-[#245789] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z" clipRule="evenodd" />
                <path d="M9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-[#245789] mb-6">Carry Your ID</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              Receive your personalized ICE Tracer ID card or wearable device that connects to your secure medical profile for instant access.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-24 h-24 bg-[#245789] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-[#245789] mb-6">Emergency Access</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              First responders can instantly access your critical medical information when you need it most, potentially saving precious time and your life.
            </p>
          </motion.div>
        </div>

        {/* FAQ Link */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg">
            Still Have Questions?{" "}
            <a href="#" className="text-[#245789] underline font-medium hover:text-[#CA0015] transition-colors">
              Check out our FAQs.
            </a>
          </p>
        </motion.div>
      </Section>

      {/* Features Included in All Plans Section */}
      <section id="features" className="py-20 px-4 bg-[#245789]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-16">
            Features Included in All Plans
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Personal Information */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/personalinfo.png"
                  alt="Personal Information"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <p className="text-white/90 leading-relaxed">
                Each plan includes a real-time portal for members to store personal information such as a profile photo, name, address, phone number, and other details.
              </p>
            </div>

            {/* Physicians */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/physicians.png"
                  alt="Physicians"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Physicians</h3>
              <p className="text-white/90 leading-relaxed">
                List your healthcare provider&apos;s contact information to ensure easy access during both emergency and non-emergency situations.
              </p>
            </div>

            {/* Insurance */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/insurance.png"
                  alt="Insurance"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Insurance</h3>
              <p className="text-white/90 leading-relaxed">
                Store your insurance information online for easy access during accidents, doctor&apos;s appointments, and prescription pickups.
              </p>
            </div>

            {/* Emergency Contacts */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/emergencycontacts.png"
                  alt="Emergency Contacts"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
              <p className="text-white/90 leading-relaxed">
                Save emergency contact information for quick access by medical staff in case of an emergency.
              </p>
            </div>

            {/* Health Conditions */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/healthconditions.png"
                  alt="Health Conditions"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Health Conditions</h3>
              <p className="text-white/90 leading-relaxed">
                Provide details of any pre-existing health conditions to help First Responders and medical staff offer the best care if you are unable to communicate.
              </p>
            </div>

            {/* Medications */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/medications.png"
                  alt="Medications"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Medications</h3>
              <p className="text-white/90 leading-relaxed">
                List your current medications to inform First Responders about any drugs in your system, helping prevent contraindications during treatment.
              </p>
            </div>

            {/* Hospitalizations */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/hospitalizations.png"
                  alt="Hospitalizations"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Hospitalizations</h3>
              <p className="text-white/90 leading-relaxed">
                Include a summary of past hospitalizations to give First Responders a better understanding of your medical history, aiding in appropriate emergency care.
              </p>
            </div>

            {/* Documents */}
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src="/images/documents.png"
                  alt="Documents"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">Documents</h3>
              <p className="text-white/90 leading-relaxed">
                Upload and save X-rays, imaging, and other diagnostic records to your profile for easy retrieval and reference by medical personnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#245789] mb-6">
            Which Plan is Right for You?
          </h2>
          <p className="text-lg text-center text-gray-700 mb-4 max-w-4xl mx-auto">
            Take control of your health by storing lifesaving medical and emergency contact information that can be accessed anywhere, 24 hours a day, 7 days a week.
          </p>
          <p className="text-center text-[#245789] font-medium mb-12">
            -Easily Manage Multiple Profiles Under a Single Account-
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Bronze Plan */}
            <div className="bg-white rounded-lg shadow-lg border-2 border-[#245789] p-8 text-center">
              <h3 className="text-3xl font-bold text-[#245789] mb-2">Bronze</h3>
              <p className="text-4xl font-bold text-[#245789] mb-4">$4.99<span className="text-lg">/mo</span></p>
              <p className="text-[#245789] font-medium mb-6">Manage Up to 3 Profiles</p>
              
              <div className="text-left space-y-3 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Personal Information</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Vital Conditions</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Allergies</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Medical History</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Emergency Contacts</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Medications</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Hospitalizations</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Immunizations</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Physicians</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Advanced Directives</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#245789] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Store & Share Documents</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                GET STARTED
              </Button>
            </div>

            {/* Silver Plan */}
            <div className="bg-[#245789] rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">Silver</h3>
              <p className="text-4xl font-bold text-white mb-4">$11.99<span className="text-lg">/mo</span></p>
              <p className="text-white font-medium mb-6">Manage Up to 10 Profiles</p>
              
              <div className="text-left space-y-3 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Personal Information</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Vital Conditions</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Allergies</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Medical History</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Emergency Contacts</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Medications</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Hospitalizations</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Immunizations</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Physicians</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Advanced Directives</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Store & Share Documents</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                GET STARTED
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#245789]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
            Customers Love ICE Tracer
          </h2>
          <p className="text-lg text-center text-white/90 mb-16 max-w-4xl mx-auto">
            Whether you need peace of mind, security, or a reliable way to manage your health information, ICE Tracer has you covered.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#245789] mb-4">
                Peace of Mind with ICE Tracer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                I am so grateful for ICE Tracer! As someone with a medical condition, I always worry about emergencies and not being able to communicate important information to First Responders. With ICE Tracer, I have peace of mind knowing that my emergency medical information is easily accessible and can potentially save my life.
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#CA0015]">Charlotte</div>
                  <div className="text-gray-600 text-sm">Boston, MA</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#245789] mb-4">
                ICE Tracer: A Lifesaver
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Thanks to ICE Tracer, I feel more secure knowing that my crucial medical information is readily accessible in case of an emergency. The website is user-friendly and provides a comprehensive platform to store and update my medical history, medications, and emergency contacts. I highly recommend ICE Tracer for anyone looking for a reliable and efficient way to ensure their safety and well-being.
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#CA0015]">Benny</div>
                  <div className="text-gray-600 text-sm">Irving, TX</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#245789] mb-4">
                Security and Reliability
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                In case of emergency, I&apos;m more secure because my critical medical information is readily available with ICE Tracer. In addition to providing a comprehensive platform for storing and updating my medical history, medications, and emergency contacts. If you want a reliable and efficient way to ensure your safety and well-being,
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#CA0015]">Sam</div>
                  <div className="text-gray-600 text-sm">Hartford, CT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - What's New */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#245789] mb-6">
            What's New?
          </h2>
          <p className="text-lg text-center text-gray-700 mb-16 max-w-4xl mx-auto">
            Don&apos;t leave your medical care to chance. ICE Tracer gives you peace of mind should you be involved in an accident and are unable to communicate your medical history or emergency contact information with First Responders.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-10">
                <Image
                  src="/images/Man_Defibrilator.png"
                  alt="Man lying on the floor with EMS providing CPR with a defibrillator"
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#245789] mb-3">
                  Discover the Top 13 Reasons for EMS Calls
                </h3>
                <p className="text-gray-600 text-sm">
                  June 30th, 2017
                </p>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-10">
                <Image
                  src="/images/heimlich-maneuver.png"
                  alt="A person in a grey shirt is leaning over a person in a teal shirt who is laying on the ground, and is performing chest compressions as part of CPR"
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#245789] mb-3">
                  How to Perform the Heimlich Maneuver & CPR
                </h3>
                <p className="text-gray-600 text-sm">
                  June 30th, 2017
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-3 h-3 rounded-full bg-[#245789]"></div>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-[#245789]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-lg lg:text-xl text-white leading-relaxed">
              Sign up today and take the first step towards ensuring your health information is always within reach. Whether it's for yourself or a loved one, ICE Tracer offers the security and peace of mind that could save a life.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button variant="outline" size="lg" className="bg-white text-[#245789] hover:bg-gray-100 border-white text-xl px-12">
              SIGN UP TODAY
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Left Column - Logo and CTA */}
            <div className="lg:col-span-1">
              <Image
                src="/images/ICE-Tracer-Logo.png"
                alt="ICE Tracer Logo"
                width={150}
                height={48}
                className="h-12 mb-6"
              />
              <h3 className="text-2xl font-bold text-[#484848] mb-6">
                Don&apos;t Leave Your Medical Care to Chance
              </h3>
              <button className="bg-[#245789] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e4a75] transition-colors mb-6">
                REGISTER NOW
              </button>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Columns - Links */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {/* Left Footer Links */}
              <div>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Blog</a></li>
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">About</a></li>
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Warranty/Refund</a></li>
                </ul>
              </div>
              
              {/* Right Footer Links */}
              <div>
                <ul className="space-y-3">
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">FAQs</a></li>
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Employer Groups</a></li>
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Affiliate Program</a></li>
                  <li><a href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Affinity Partners</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright and Bottom Links */}
          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="text-[#484848] text-sm">
                Copyright © ICE Tracer 2024 – All Rights Reserved
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm">Terms & Conditions</a>
                <a href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
