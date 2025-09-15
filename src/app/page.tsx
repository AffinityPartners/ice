'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ProgressiveSection, ProgressiveCardGrid } from "@/components/ui/ProgressiveSection";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ScrollReveal, StaggeredReveal } from "@/components/ui/ScrollAnimations";
import { Footer } from "@/components/layout/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getRecentPosts } from "@/data/blogPosts";

// React Icons imports
import { 
  FaLock, 
  FaEye, 
  FaThLarge, 
  FaUserPlus, 
  FaUsers, 
  FaEyeSlash, 
  FaLink, 
  FaShare, 
  FaIdCard, 
  FaAmbulance, 
  FaCheck, 
  FaMoneyBillWave,
  FaChevronRight
} from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Video Background - Enhanced */}
      <section className="relative min-h-[60vh] sm:h-[65vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
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
          className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dynamic Medical Emergency ID Solution
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
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
            <a href="https://www.icetracer.com/choose-plan">
              <Button size="lg" className="text-lg sm:text-xl lg:text-2xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 min-h-[48px] sm:min-h-[52px]">
                SIGN UP TODAY
              </Button>
            </a>
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
      <Section background="gray-light" animate separator padding="lg">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-stretch w-full">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center w-full min-w-0 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#245789] mb-6 sm:mb-8 leading-tight break-words hyphens-auto">
              Your Health, Always Within Reach
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-8 sm:mb-10 leading-relaxed break-words hyphens-auto">
              In emergencies, every second counts. ICE Tracer is a revolutionary cloud-based service that securely stores your comprehensive medical profile, making it instantly accessible to First Responders through ID cards or wearable devices. With ICE Tracer, your critical health information is always at hand, providing peace of mind when you can&apos;t communicate.
            </p>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#245789] mb-6 sm:mb-8 break-words hyphens-auto">
                Why Choose ICE Tracer?
              </h3>
              
              <motion.div 
                className="space-y-4 sm:space-y-6 mb-8 sm:mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Security */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaLock className="w-5 h-5 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                      <span className="text-[#CA0015]">Security</span> - Your data is stored with the highest level of encryption, ensuring your privacy and security are never compromised.
                    </h4>
                  </div>
                </div>
                
                {/* Accessibility */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaEye className="w-5 h-5 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                      <span className="text-[#CA0015]">Accessibility</span> - First Responders can access your medical profile quickly and easily, making it simpler to provide accurate and timely care.
                    </h4>
                  </div>
                </div>
                
                {/* Convenience */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaThLarge className="w-5 h-5 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base leading-relaxed break-words hyphens-auto">
                      <span className="text-[#CA0015]">Convenience</span> - Our wearable devices and ID cards are designed for everyday use, blending seamlessly with your daily routine while providing essential protection.
                    </h4>
                  </div>
                </div>
              </motion.div>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed break-words hyphens-auto">
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
              <Image
                src="/images/ICE-Tracer-er-visit.png"
                alt="Medical emergency room visit with first responders"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
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
      <Section background="blue-soft" animate separator>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Side - Device Mockups */}
            <div className="relative order-2 lg:order-1">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/ICE-Profile-Image-2024-HQ.png"
                  alt="ICE Tracer medical profile interface"
                  width={800}
                  height={600}
                  className="w-full h-auto max-w-lg sm:max-w-xl lg:max-w-2xl rounded-lg shadow-lg mx-auto"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-6">
                Easily Update Medical Profiles
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                Keep your profile up to date with unlimited changes, ensuring First Responders and health care providers have the most current information anytime, anywhere.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 overflow-visible">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <MdHealthAndSafety className="w-5 h-5 sm:w-4 sm:h-4 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="min-w-0 [overflow-wrap:anywhere] hyphens-auto text-center sm:text-left">
                    <span className="font-semibold text-[#CA0015]">Health Record Management:</span> Create & update unlimited medical information
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 overflow-visible">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaUsers className="w-5 h-5 sm:w-4 sm:h-4 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="min-w-0 [overflow-wrap:anywhere] hyphens-auto text-center sm:text-left">
                    <span className="font-semibold text-[#CA0015]">Dependents:</span> Add and manage family member profiles from a single account
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 overflow-visible">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaEyeSlash className="w-5 h-5 sm:w-4 sm:h-4 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="min-w-0 [overflow-wrap:anywhere] hyphens-auto text-center sm:text-left">
                    <span className="font-semibold text-[#CA0015]">Privacy:</span> Choose which medical details should display on public accessed profiles
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 overflow-visible">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaLink className="w-5 h-5 sm:w-4 sm:h-4 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="min-w-0 [overflow-wrap:anywhere] hyphens-auto text-center sm:text-left">
                    <span className="font-semibold text-[#CA0015]">Multiple Product Linking:</span> Connect multiple devices to each profile
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 overflow-visible">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 bg-[#CA0015] rounded-full flex items-center justify-center sm:mt-1">
                    <FaShare className="w-5 h-5 sm:w-4 sm:h-4 md:w-3 md:h-3 text-white" />
                  </div>
                  <div className="min-w-0 [overflow-wrap:anywhere] hyphens-auto text-center sm:text-left">
                    <span className="font-semibold text-[#CA0015]">Share Information:</span> Conveniently share your profile with healthcare providers
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <a href="https://www.icetracer.com/choose-plan">
                  <Button size="lg" className="px-10">
                    COMPARE PLANS
                  </Button>
                </a>
              </div>
            </div>
          </div>
      </Section>

      {/* How ICE Tracer Works Section - Enhanced */}
      <Section background="white" animate separator>
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#245789] mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How ICE Tracer Works
        </motion.h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {/* Step 1 */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-20 h-20 sm:w-24 sm:h-24 bg-[#245789] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaUserPlus className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
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
              className="w-20 h-20 sm:w-24 sm:h-24 bg-[#245789] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaIdCard className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
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
              className="w-20 h-20 sm:w-24 sm:h-24 bg-[#245789] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaAmbulance className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
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
            <a href="/faq" className="text-[#245789] underline font-medium hover:text-[#CA0015] transition-colors">
              Check out our FAQs.
            </a>
          </p>
        </motion.div>
      </Section>

      {/* Features Included in All Plans Section */}
      <Section id="features" background="blue" animate separator>
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-16">
            Features Included in All Plans
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Personal Information</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Physicians</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Insurance</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Emergency Contacts</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Health Conditions</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Medications</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Hospitalizations</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Documents</h3>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                Upload and save X-rays, imaging, and other diagnostic records to your profile for easy retrieval and reference by medical personnel.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Plans Section */}
      <Section id="plans" background="gray-light" animate separator>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#245789] mb-6">
              Which Plan is Right for You?
            </h2>
            <p className="text-lg text-center text-gray-700 mb-4 max-w-4xl mx-auto">
              Take control of your health by storing lifesaving medical and emergency contact information that can be accessed anywhere, 24 hours a day, 7 days a week.
            </p>
            <div className="bg-gradient-to-r from-[#245789] to-[#2d6aa0] text-white sm:px-6 py-2 sm:py-3 rounded-xl font-medium mb-8 sm:mb-12 text-xs sm:text-sm text-center mx-auto max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="flex items-center justify-center gap-2">
           
                <span>Easily Manage Multiple Profiles Under a Single Account</span>
              </div>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Bronze Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#245789]/20 hover:border-[#245789]/40 p-8 h-full flex flex-col group-hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-[#245789] to-[#2d6aa0] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    STARTER
                  </div>
                  <h3 className="text-3xl font-bold text-[#245789] mb-2">Bronze</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-[#245789]">$4.99</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                                     <p className="text-[#245789] font-medium bg-blue-50 py-2 px-4 rounded-lg">
                     Manage Up to 3 Profiles
                   </p>
                </div>
                
                <div className="flex-1 mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center">Everything You Need:</h4>
                  <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                    {[
                      'Personal Information',
                      'Vital Conditions', 
                      'Allergies',
                      'Medical History',
                      'Emergency Contacts',
                      'Medications',
                      'Hospitalizations',
                      'Immunizations',
                      'Physicians',
                      'Advanced Directives',
                      'Store & Share Documents'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-center sm:justify-start py-2 sm:py-1 px-4 sm:px-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow-md sm:shadow-none backdrop-blur-sm">
                        <div className="hidden sm:flex w-4 h-4 bg-gradient-to-r from-[#245789] to-[#2d6aa0] rounded-full items-center justify-center mr-3 flex-shrink-0">
                          <FaCheck className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a href="https://www.icetracer.com/choose-plan">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#245789] to-[#2d6aa0] hover:from-[#CA0015] hover:to-[#b8000f] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                    size="lg"
                  >
                    GET STARTED
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Silver Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-[#245789] via-[#2d6aa0] to-[#1e4a6b] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-8 h-full flex flex-col group-hover:scale-105 border-4 border-[#CA0015]/20">
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-[#CA0015] to-[#b8000f] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    BEST VALUE
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Silver</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-white">$11.99</span>
                    <span className="text-white/80 ml-2">/month</span>
                  </div>
                                     <p className="text-white font-medium bg-white/20 backdrop-blur-sm py-2 px-4 rounded-lg">
                     Manage Up to 10 Profiles
                   </p>
                </div>
                
                <div className="flex-1 mb-8">
                  <h4 className="text-lg font-semibold text-white mb-6 text-center">Everything in Bronze Plus:</h4>
                  <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                    {[
                      'Personal Information',
                      'Vital Conditions',
                      'Allergies',
                      'Medical History',
                      'Emergency Contacts',
                      'Medications',
                      'Hospitalizations',
                      'Immunizations',
                      'Physicians',
                      'Advanced Directives',
                      'Store & Share Documents'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-center sm:justify-start py-2 sm:py-1 px-4 sm:px-0 bg-white/10 sm:bg-transparent rounded-lg sm:rounded-none backdrop-blur-sm">
                        <div className="hidden sm:flex w-4 h-4 bg-gradient-to-r from-[#CA0015] to-[#b8000f] rounded-full items-center justify-center mr-3 flex-shrink-0">
                          <FaCheck className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a href="https://www.icetracer.com/choose-plan">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#CA0015] to-[#b8000f] hover:from-white hover:to-gray-100 hover:text-[#245789] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                    size="lg"
                  >
                    GET STARTED
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </Section>

      {/* Testimonials Section */}
      <Section background="blue" animate separator>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
            Customers Love ICE Tracer
          </h2>
          <p className="text-lg text-center text-white/90 mb-16 max-w-4xl mx-auto">
            Whether you need peace of mind, security, or a reliable way to manage your health information, ICE Tracer has you covered.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                  <FaChevronRight className="w-4 h-4 text-white" />
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
                  <FaChevronRight className="w-4 h-4 text-white" />
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
                  <FaChevronRight className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#CA0015]">Sam</div>
                  <div className="text-gray-600 text-sm">Hartford, CT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Blog Section - What's New */}
      <Section background="white" animate separator>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#245789] mb-6">
              What&apos;s New?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
              Don&apos;t leave your medical care to chance. ICE Tracer gives you peace of mind should you be involved in an accident and are unable to communicate your medical history or emergency contact information with First Responders.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[#245789] hover:text-[#CA0015] font-medium transition-colors"
            >
              View All Articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {getRecentPosts(3).map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                variant="default"
              />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Final CTA Section */}
      <Section background="blue" padding="md" animate separator>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-lg lg:text-xl text-white leading-relaxed">
              Sign up today and take the first step towards ensuring your health information is always within reach. Whether it&apos;s for yourself or a loved one, ICE Tracer offers the security and peace of mind that could save a life.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a href="https://www.icetracer.com/choose-plan">
              <Button variant="outline" size="lg" className="bg-white text-[#245789] hover:bg-gray-100 border-white text-lg sm:text-xl px-8 sm:px-12 min-h-[48px] sm:min-h-[52px]">
                SIGN UP TODAY
              </Button>
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop 
        threshold={400}
        position="bottom-left"
        variant="secondary"
        showProgress={true}
        size="md"
      />
    </div>
  );
}
