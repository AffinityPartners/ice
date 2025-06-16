'use client'

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function WhatIsICETracer() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-[#245789] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-3">
            <span className="inline-block bg-[#CA0015] text-white px-3 py-1 rounded text-sm font-medium">
              In The News
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            What is ICE Tracer?
          </h1>
          <div className="text-white/90 text-sm">
            By Daphyne Lovejoy • June 30th, 2017 • 2 min read
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/blog" className="text-gray-600 hover:text-[#245789]">Blog</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">What is ICE Tracer?</span>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src="/images/What_is_ICE_Blog.png"
            alt="Emergency sign highlighting the importance of medical information accessibility"
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed font-medium">
            ICE Tracer takes control of your health by storing lifesaving medical and emergency contact information where it can be accessed anywhere 24 hours a day, 7 days a week.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Members are able to store information in an online profile that includes:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Personal Information
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Physicians
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Insurance
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Emergency Contacts
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Health Conditions
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Medications
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Hospitalization Records
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[#CA0015] rounded-full mr-3"></div>
                Health Documents
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-[#245789] mb-4">
            Detailed Information Categories
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Here are examples of the types of information stored under each category:
          </p>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">1. Personal Information</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Includes storing a profile picture for proper identification, your address and primary contact information.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">2. Physicians</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Including your Primary Care Physician and any specialists gives First Responders and hospital staff the information needed to contact your doctor and inform them of your injury/condition.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">3. Insurance</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                While medical care is provided without proof of insurance, having this information available in your ICE Tracer profile is convenient if you visit a new doctor, or pick up a prescription requiring proof of coverage.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">4. Emergency Contacts</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Emergency contact and secondary contact information is necessary so they may be notified of your condition in the event you are in an accident.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">5. Health Conditions</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Reporting health conditions in your profile alerts emergency staff of special health conditions so that you may receive the most appropriate care.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">6. Medications</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Listing medications and doses prevents the treating staff of giving you a medication that may be contraindicated and cause a negative reaction.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">7. Hospitalizations</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Hospitalizations are important to inform medical staff of any past stays that can determine the care you receive.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h3 className="text-lg font-bold text-[#245789] mb-2">8. Health Documents</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Scanning health documents including vaccinations, X-rays, CT/MRIs, and other important forms can be easily accessed when needed.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#245789] mb-4 mt-8">
            How Does It Work?
          </h2>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            Members receive their card or wearable device in the mail that is linked to their profile. Important information is then added and stored in the profile for quick reference. In the event of an emergency, First Responders are able to access the member's profile by scanning the QR code on the wallet card or wearable device, or by entering the member's ID and PIN number on the ICE Tracer website.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Medical information stored in the profile is then viewable and gives guidance on how to provide the most appropriate emergency care. Emergency contacts are also able to be notified that you have been in an accident since their information is stored as well.
          </p>

          <h2 className="text-2xl font-bold text-[#245789] mb-4">
            Why Choose ICE Tracer?
          </h2>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            Overall, ICE Tracer works as a modern-day way to store important health information for easy access in the event of an emergency or if you need to provide other medical records at any time. This information can be accessed through a dedicated QR code on a wearable device or ID Card, anytime, anywhere. Members can keep their profile up to date with an unlimited number of changes available.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            With three membership options, there's a plan to fit every family. Your ICE Tracer card is meant to be stored behind your driver's license for easy access when in an accident, and a variety of wearable IDs are available to meet each lifestyle need.
          </p>

          <div className="bg-[#245789] text-white p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Take control of your health information today with ICE Tracer's comprehensive medical ID system.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-[#CA0015] text-white px-6 py-2 rounded font-bold hover:bg-[#a8000f] transition-colors text-sm"
            >
              Get ICE Tracer Today
            </Link>
            <p className="text-xs text-white/90 mt-3">
              For questions or more information, please email our team at{" "}
              <a href="mailto:info@icetracer.com" className="text-white underline hover:text-white/80 transition-colors">
                info@icetracer.com
              </a>
            </p>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-[#245789] mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/top-13-reasons-ems-calls" className="block hover:opacity-80 transition-opacity">
              <div className="border rounded-lg overflow-hidden">
                <Image
                  src="/images/Man_Defibrilator.png"
                  alt="EMS providing emergency care"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs text-gray-500">June 30th, 2017 • 5 min read</span>
                  <h3 className="font-bold text-[#245789] mt-1">Discover the Top 13 Reasons for EMS Calls</h3>
                  <p className="text-sm text-gray-600 mt-2">Understanding the most common reasons people call emergency medical services can help you prepare for potential health emergencies.</p>
                </div>
              </div>
            </Link>
            <Link href="/blog/heimlich-maneuver-cpr-guide" className="block hover:opacity-80 transition-opacity">
              <div className="border rounded-lg overflow-hidden">
                <Image
                  src="/images/heimlich-maneuver.png"
                  alt="CPR and Heimlich maneuver demonstration"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs text-gray-500">June 30th, 2017 • 8 min read</span>
                  <h3 className="font-bold text-[#245789] mt-1">How to Perform the Heimlich Maneuver & CPR</h3>
                  <p className="text-sm text-gray-600 mt-2">Learn the essential life-saving techniques every person should know for emergency situations.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 