'use client'

import Image from "next/image";
import Link from "next/link";
import { Section } from "./Section";

export function Footer() {
  return (
    <Section background="gray-light" className="bg-gray-100">
      <div className="relative">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Logo and CTA */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/images/ICE-Tracer-Logo.png"
                alt="ICE Tracer Logo"
                width={150}
                height={48}
                className="h-12 w-auto object-contain mb-6 hover:opacity-80 transition-opacity"
              />
            </Link>
            <h3 className="text-2xl font-bold text-[#484848] mb-6">
              Don&apos;t Leave Your Medical Care to Chance
            </h3>
            <Link 
              href="/" 
              className="inline-block bg-[#245789] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e4a75] transition-colors mb-6 shadow-md hover:shadow-lg"
            >
              REGISTER NOW
            </Link>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors hover:scale-105 transform duration-200" 
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors hover:scale-105 transform duration-200" 
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-[#245789] rounded flex items-center justify-center text-white hover:bg-[#1e4a75] transition-colors hover:scale-105 transform duration-200" 
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {/* Left Footer Links */}
            <div>
              <h4 className="text-lg font-bold text-[#245789] mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/blog" className="text-[#484848] hover:text-[#245789] transition-colors">Blog</Link></li>
                <li><Link href="/about" className="text-[#484848] hover:text-[#245789] transition-colors">About</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Contact Us</Link></li>
                <li><Link href="/warranty-refund" className="text-[#484848] hover:text-[#245789] transition-colors">Warranty/Refund</Link></li>
              </ul>
            </div>
            
            {/* Right Footer Links */}
            <div>
              <h4 className="text-lg font-bold text-[#245789] mb-4">Support</h4>
              <ul className="space-y-3">
                <li><Link href="/faq" className="text-[#484848] hover:text-[#245789] transition-colors">FAQs</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Employer Groups</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Affiliate Program</Link></li>
                <li><Link href="#" className="text-[#484848] hover:text-[#245789] transition-colors">Affinity Partners</Link></li>
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
              <Link href="/privacy-policy" className="text-[#484848] hover:text-[#245789] transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms-conditions" className="text-[#484848] hover:text-[#245789] transition-colors text-sm">Terms & Conditions</Link>
              <Link href="/security" className="text-[#484848] hover:text-[#245789] transition-colors text-sm">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
} 