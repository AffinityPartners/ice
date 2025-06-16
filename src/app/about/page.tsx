'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

export default function About() {
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
            About ICE Tracer
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Personal Health Record System for Emergency Situations
          </motion.p>
        </motion.div>
      </Section>

      {/* What is ICE Tracer Section */}
      <Section background="white" animate separator>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#245789] mb-8 text-center">
            What is ICE Tracer?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              ICETracer.com is a Personal Health Record System that allows members to add, edit and store lifesaving emergency contact and medical information.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Do you ever worry that in the event of an unforeseen accident, your personal medical information will not be available to First Responders? Have you been in a situation where emergency medical services were unable to identify you or notify your loved ones of your condition? Then you need a quick, fast, convenient solution. With the ICE Tracer card, First Responders will have access to your personal health record, as well as the accessibility to contact your family to alert them of your current situation and condition.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* How It Works Section */}
      <Section background="gray-light" animate separator>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#245789] mb-8 text-center">
            Guaranteed Access to Vital Information
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              ICE Tracer is identified as a guaranteed way to access your vital personal health information. Each ICE Tracer card includes urgent emergency information, a QR code that can be scanned by any smartphone and your personal member ID number. By scanning the QR code or inputting your member ID number, First Responders, EMTs, nurses or any responding medical personnel are taken to your personal profile page where they learn necessary medical and emergency contact information.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Members use ICETracer.com to add, edit and store their emergency contact information along with vital medical conditions like allergies, pre-existing conditions, medications and hospitalizations.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Device Access Section */}
      <Section background="white" animate separator>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#245789] mb-8 text-center">
            Multiple Access Options
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              ICE Tracer is identified as a guaranteed way to access your vital personal health information. Each ICE Tracer device gives access to urgent emergency information by scanning the dedicated QR code by any smartphone. By scanning the QR code or inputting your device ID and PIN number, First Responders, EMTs, nurses or any responding medical personnel are taken to your personal profile page where they learn necessary medical and emergency contact information.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Members use ICETracer.com to add, edit and store their emergency contact information along with vital medical conditions like allergies, pre-existing conditions, medications and hospitalizations.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Benefits Section */}
      <Section background="blue" animate separator>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
            The ICE Tracer Advantage
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#CA0015] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Reduce Confusion</h3>
                <p className="text-white/90">Clear, organized medical information eliminates guesswork for first responders</p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#CA0015] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Increase Response Time</h3>
                <p className="text-white/90">Instant access to critical information speeds up medical treatment</p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#CA0015] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 12a1 1 0 102 0V8a1 1 0 10-2 0v4zm0-7a1 1 0 112 0 1 1 0 01-2 0zM10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Minimize Risk</h3>
                <p className="text-white/90">Prevent medical errors by providing accurate health information</p>
              </motion.div>
            </div>

            <motion.p 
              className="text-xl md:text-2xl text-white text-center font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Reduce confusion, increase response time and minimize risk, all with the help of a single simple tool. When it comes to your health and safety, you deserve the best.
            </motion.p>
          </div>
        </motion.div>
      </Section>

      {/* Call to Action Section */}
      <Section background="gray-light" animate>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-6">
            Ready to Protect Yourself and Your Loved Ones?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of members who trust ICE Tracer to keep their vital medical information accessible when it matters most.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="/" 
              className="inline-block bg-[#CA0015] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#a8000f] transition-colors duration-200"
            >
              SIGN UP TODAY
            </a>
          </motion.div>
        </motion.div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 