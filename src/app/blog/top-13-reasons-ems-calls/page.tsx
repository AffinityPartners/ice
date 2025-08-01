'use client'

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function Top13ReasonsEMSCalls() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-[#245789] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="mb-3">
            <span className="inline-block bg-[#CA0015] text-white px-3 py-1 rounded text-sm font-medium">
              Emergency Response
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Discover the Top 13 Reasons for EMS Calls
          </h1>
          <div className="text-white/90 text-sm">
            June 30th, 2017 • 5 min read • <Link href="/blog" className="hover:text-white transition-colors">← Back to Blog</Link>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Featured Image */}
        <div className="mb-6 md:mb-8">
          <Image
            src="/images/Man_Defibrilator.png"
            alt="Man lying on the floor with EMS providing CPR with a defibrillator"
            width={800}
            height={400}
            className="w-full h-48 md:h-64 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed font-medium">
            Understanding the most common reasons people call emergency medical services can help you prepare for potential health emergencies and know when to seek immediate medical attention.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-[#245789] mb-3 md:mb-4">
            Why Understanding EMS Call Reasons Matters
          </h2>
          
          <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Emergency Medical Services (EMS) respond to thousands of calls daily, ranging from minor injuries to life-threatening emergencies. By understanding the most common reasons people call 911 for medical assistance, you can better prepare yourself and your family for potential emergencies and make informed decisions about when emergency care is truly needed.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-[#245789] mb-3 md:mb-4">
            The Top 13 Reasons for EMS Calls
          </h2>

          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">1. Chest Pain and Heart Problems</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Chest pain is one of the most common reasons people call EMS. It can indicate serious conditions like heart attacks, angina, or other cardiac emergencies that require immediate medical attention.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">2. Difficulty Breathing</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Respiratory distress can be caused by asthma attacks, pneumonia, heart failure, or other serious conditions that prevent adequate oxygen flow to vital organs.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">3. Falls and Fall-Related Injuries</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Falls are particularly common among elderly patients and can result in fractures, head injuries, or other serious complications requiring emergency care.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">4. Motor Vehicle Accidents</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Traffic accidents often result in multiple trauma patients requiring immediate emergency medical intervention and transport to trauma centers.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">5. Stroke Symptoms</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Recognizing stroke symptoms (face drooping, arm weakness, speech difficulty) and calling EMS immediately can save lives and prevent permanent disability.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">6. Unconsciousness or Altered Mental Status</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                When someone is unconscious or showing signs of confusion, disorientation, or altered consciousness, immediate medical evaluation is crucial.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">7. Severe Abdominal Pain</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Intense abdominal pain can indicate serious conditions like appendicitis, gallbladder problems, or internal bleeding requiring emergency surgery.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">8. Seizures</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Seizures, especially prolonged ones or those occurring in non-epileptic patients, require immediate medical attention to prevent complications.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">9. Severe Bleeding</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Uncontrolled bleeding from trauma, surgery, or medical conditions can quickly become life-threatening and requires immediate intervention.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">10. Drug Overdose or Poisoning</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Accidental or intentional overdoses and poisoning cases require immediate medical care and often antidote administration.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">11. Severe Allergic Reactions</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Anaphylaxis and severe allergic reactions can cause airway closure and shock, requiring immediate epinephrine and emergency care.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">12. Diabetic Emergencies</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Both high and low blood sugar levels can create life-threatening situations requiring immediate medical intervention and monitoring.
              </p>
            </div>

            <div className="border-l-4 border-[#245789] pl-3 md:pl-4">
              <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">13. Behavioral or Psychiatric Emergencies</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Mental health crises that pose a danger to the patient or others require specialized emergency intervention and care.
              </p>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-[#245789] mb-3 md:mb-4 mt-6 md:mt-8">
            How ICE Tracer Can Help in Emergencies
          </h2>
          
          <p className="text-gray-700 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
            When you're involved in any of these emergency situations, having your medical information immediately available to first responders can be life-saving. ICE Tracer provides instant access to your:
          </p>

          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4 md:mb-6 text-sm pl-2">
            <li>Current medications and dosages</li>
            <li>Known allergies and adverse reactions</li>
            <li>Pre-existing medical conditions</li>
            <li>Emergency contact information</li>
            <li>Healthcare provider details</li>
            <li>Insurance information</li>
          </ul>

          <div className="bg-[#245789] text-white p-4 md:p-6 rounded-lg mt-6 md:mt-8">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Be Prepared for Any Emergency</h3>
            <p className="mb-3 md:mb-4 text-sm leading-relaxed">
              Don't wait until it's too late. Ensure your vital medical information is always accessible to first responders when you need it most.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-[#CA0015] text-white px-4 md:px-6 py-2 rounded font-bold hover:bg-[#a8000f] transition-colors text-sm"
            >
              Get ICE Tracer Today
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#245789] mb-4 md:mb-6">Related Articles</h2>
          <div className="max-w-4xl mx-auto">
            <Link href="/blog/heimlich-maneuver-cpr-guide" className="block hover:opacity-80 transition-opacity">
              <div className="border rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src="/images/heimlich-maneuver.png"
                      alt="CPR and Heimlich maneuver demonstration"
                      width={300}
                      height={200}
                      className="w-full h-32 md:h-40 lg:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-3 md:p-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>June 30th, 2017</span>
                      <span>8 min read</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#245789] mb-2">
                      How to Perform the Heimlich Maneuver & CPR
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Learn the essential life-saving techniques every person should know. Step-by-step instructions for performing the Heimlich maneuver and CPR in emergency situations.
                    </p>
                  </div>
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