'use client'

import Image from "next/image";
import Link from "next/link";
import { Section } from "./Section";
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

/**
 * Footer component that provides site navigation, social links, and company information.
 * Implements responsive design with mobile-first approach, ensuring proper stacking
 * and spacing across all device sizes while maintaining visual hierarchy.
 */
export function Footer() {
  return (
    <Section background="gray-light" className="bg-gray-100">
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-10 lg:mb-12">
          {/* Left Column - Logo and CTA */}
          <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
            <Link href="/" className="inline-block">
              {/* Mobile Footer Logo - smaller for mobile screens */}
              <Image
                src="/images/ICETracer-Logo-Mobile.png"
                alt="ICE Tracer Logo"
                width={120}
                height={36}
                className="h-8 w-auto object-contain mb-4 sm:mb-6 hover:opacity-80 transition-opacity sm:hidden"
              />
              {/* Desktop Footer Logo - larger for bigger screens */}
              <Image
                src="/images/ICE-Tracer-Logo.png"
                alt="ICE Tracer Logo"
                width={150}
                height={48}
                className="hidden sm:block h-10 sm:h-12 w-auto object-contain mb-4 sm:mb-6 hover:opacity-80 transition-opacity"
              />
            </Link>
            <h3 className="text-xl sm:text-2xl font-bold text-[#484848] mb-4 sm:mb-6 leading-tight">
              Don&apos;t Leave Your Medical Care to Chance
            </h3>
            <Link 
              href="/choose-plan" 
              className="inline-block bg-[#245789] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-[#1e4a75] transition-colors mb-4 sm:mb-6 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              REGISTER NOW
            </Link>
            
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors hover:scale-105 transform duration-200" 
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors hover:scale-105 transform duration-200" 
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors hover:scale-105 transform duration-200" 
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Footer Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-[#245789] mb-4">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/blog" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">Blog</Link></li>
                <li><Link href="/about" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">About</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">Contact Us</Link></li>
                <li><Link href="/warranty-refund" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">Warranty/Refund</Link></li>
              </ul>
            </div>
            
            {/* Right Footer Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-[#245789] mb-4">Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/faq" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">FAQs</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">Employer Groups</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">Affiliate Program</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors text-sm sm:text-base">Affinity Partners</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="border-t border-gray-300 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-[#484848] text-xs sm:text-sm order-2 sm:order-1">
              Copyright © ICE Tracer 2025 – All Rights Reserved
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 order-1 sm:order-2">
              <Link href="/privacy-policy" className="text-[#484848] hover:text-[#245789] transition-colors text-xs sm:text-sm">Privacy Policy</Link>
              <Link href="/terms-conditions" className="text-[#484848] hover:text-[#245789] transition-colors text-xs sm:text-sm">Terms & Conditions</Link>
              <Link href="/security" className="text-[#484848] hover:text-[#245789] transition-colors text-xs sm:text-sm">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
} 