'use client'

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default function HeimlichManeuverCPRGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-[#245789] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-3">
            <span className="inline-block bg-[#CA0015] text-white px-3 py-1 rounded text-sm font-medium">
              Health Education
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            How to Perform the Heimlich Maneuver & CPR
          </h1>
          <div className="text-white/90 text-sm">
            By Daphyne Lovejoy • June 30th, 2017 • 5 min read
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/blog" className="text-gray-600 hover:text-[#245789]">Blog</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">How to Perform the Heimlich Maneuver & CPR</span>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src="/images/heimlich-maneuver.png"
            alt="A person in a grey shirt is leaning over a person in a teal shirt who is laying on the ground, and is performing chest compressions as part of CPR"
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#245789] mb-4">
            How Do You Know That Someone Is Choking?
          </h2>
          
          <p className="text-gray-700 mb-4 leading-relaxed">
            There are certain behaviors that someone exhibits when they are choking and unable to breathe. A person who is choking may display an inability to:
          </p>

          <div className="bg-red-50 border-l-4 border-[#CA0015] p-4 mb-6">
            <ul className="list-disc list-inside space-y-1 text-gray-700 mb-0">
              <li>Speak</li>
              <li>Cough</li>
              <li>Make noise</li>
              <li>Breathe</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-[#245789] mb-3">
            What causes choking?
          </h3>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Choking is caused when a piece of food, object or liquid becomes lodged in the throat and blocks the airway.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border-l-4 border-[#245789] pl-4">
              <h4 className="text-lg font-bold text-[#245789] mb-3">Common objects that children choke on:</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Popcorn</li>
                <li>• Candy</li>
                <li>• Pencil erasers</li>
                <li>• Hot dogs</li>
                <li>• Chewing gum</li>
                <li>• Peanuts</li>
                <li>• Cherry tomatoes</li>
                <li>• Whole grapes</li>
                <li>• Large pieces of fruit</li>
                <li>• Large pieces of vegetables</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#245789] pl-4">
              <h4 className="text-lg font-bold text-[#245789] mb-3">Adult choking causes:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Adults generally choke when they swallow food without properly chewing or when they swallow while laughing or drinking.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#245789] mb-4 mt-8">
            Performing the Heimlich Maneuver & CPR on an Adult
          </h2>

          <h3 className="text-xl font-bold text-[#245789] mb-3">
            For Conscious Choking
          </h3>
          <p className="text-red-600 font-medium mb-4">
            The Individual Cannot Cough, Speak, Cry or Breathe
          </p>

          <div className="bg-blue-50 border-l-4 border-[#245789] p-4 mb-6">
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-0">
              <li>For an adult, child and infant, start with <strong>five back blows</strong>.</li>
              <li>Give <strong>five abdominal thrusts</strong> (give chest thrusts for an infant).</li>
              <li><strong>Repeat steps 1 and 2</strong> until the:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                  <li>Object is forced out.</li>
                  <li>Person can cough forcefully or breathe.</li>
                  <li>Person becomes unconscious.</li>
                </ul>
              </li>
              <li>If the person becomes unconscious, gently lower them to the ground and give CARE for unconscious choking, beginning with looking for the object. Also, confirm that <strong>9-1-1 has been called</strong>.</li>
            </ol>
          </div>

          <h3 className="text-xl font-bold text-[#245789] mb-3">
            For Unconscious Choking
          </h3>
          <p className="text-red-600 font-medium mb-4">
            The Individual Appears to be Unconscious/Non-Responsive
          </p>

          <div className="border-l-4 border-[#245789] pl-4 mb-6">
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>For an adult, check responsiveness by tapping their shoulder and asking, <strong>"Are you okay?"</strong></li>
              <li>If no response, <strong>call 9-1-1</strong>. Roll the person face-up if they are face-down.</li>
              <li>Tilt the head and lift the chin, quickly checking for a breath (gasps do not equal breathing).</li>
              <li><strong>If No Breathing:</strong> Begin CPR. <strong>If Breathing:</strong> maintain open airway and monitor.</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <h4 className="text-lg font-bold text-[#245789] mb-2">Chest Does Not Rise with Rescue Breaths</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm mb-0">
              <li>Retilt the head and give another rescue breath.</li>
              <li>If chest continues to not rise, give <strong>30 chest compressions</strong>.</li>
              <li>Look for and remove any object if it can be seen.</li>
              <li>Give <strong>2 rescue breaths</strong> and determine if the chest is rising. If no rise, repeat steps 2 through 4. If chest does rise, check for breathing.</li>
            </ol>
          </div>

          <h3 className="text-xl font-bold text-[#245789] mb-3">
            Adult CPR: No Breathing
          </h3>

          <div className="bg-red-50 border-l-4 border-[#CA0015] p-4 mb-6">
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-2">
              <li><strong>Give 30 chest compressions.</strong> Push hard in the middle of the chest at least 2 inches deep and at least 100 compressions per minute.</li>
              <li><strong>Give 2 rescue breaths.</strong> Tilt the head back and lift the chin up. Pinch the nose shut and make a complete seal over the person's mouth. Blow for about 1 second to make the chest rise. If chest does not rise, retilt the head and give another rescue breath.</li>
              <li><strong>Do Not Stop.</strong> Continue CPR until:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                  <li>The person shows signs of recovery, such as breathing.</li>
                  <li>An AED is ready to use.</li>
                  <li>Emergency Personnel arrive and can continue with care.</li>
                  <li>You are too exhausted to continue.</li>
                  <li>The scene becomes unsafe.</li>
                </ul>
              </li>
            </ol>
            <p className="text-gray-700 font-medium text-sm mb-0">
              If an AED is available, follow the easy automated instructions to use the device.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#245789] mb-4 mt-8">
            How to Perform the Heimlich maneuver & CPR on a Child
          </h2>

          <h3 className="text-xl font-bold text-[#245789] mb-3">
            How to Perform the Heimlich Maneuver on a Child
          </h3>

          <p className="text-gray-700 mb-4 leading-relaxed">
            When a child between the ages of one and twelve are choking, there are special considerations to take and steps to follow when performing the Heimlich maneuver. Children may turn grey or blue due to an obstructed airway with the inability to talk, cough or breathe.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4">
            <p className="text-gray-700 font-medium mb-0">
              <strong>Important:</strong> If the child is unconscious, start CPR.
            </p>
          </div>

          <h4 className="text-lg font-bold text-[#245789] mb-3">
            If the Child is Conscious but Not Breathing:
          </h4>

          <div className="border-l-4 border-[#245789] pl-4 mb-6">
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Get the Child into Position.</strong> With the child facing down on your forearm with their body supported on your thigh. Keep the child's torso higher than the head.</li>
              <li><strong>Give Forceful Blows.</strong> Use the heel of your hand to thump the child in between the shoulder blades up to five times.</li>
              <li><strong>Turn the Child Over.</strong> Turn the child face up and keep supporting the head and neck. If the object is not out yet, continue to step 4.</li>
              <li><strong>Press the Chest.</strong> Place the child on a firm surface (can be your forearm). Put two to three fingers in the center of the child's breastbone and push quickly up to five times. Repeat until the object comes out. If the child continues to not breathe and is unconscious, open the airway by putting your thumb in the child's mouth and grasping the lower incisors or gums. Look for the object then but do not do a finger sweep as you could further lodge the object deeper into the child's throat.</li>
              <li><strong>If Needed, Start Child CPR.</strong> Please find a reference for proper administration of child CPR.</li>
            </ol>
          </div>

          <h2 className="text-2xl font-bold text-[#245789] mb-4 mt-8">
            How to Perform the Heimlich Maneuver on Yourself
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            If you find yourself choking and you remain conscious, locate a stable surface such as a table or chair. Press against your abdomen in the same place you would on another person (below the chest bone and above the navel). Thrust your body inward and upward in a quick motion. Continue until the object is dislodged.
          </p>

          <div className="bg-[#245789] text-white p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-3">Remember: Action is Better Than Inaction</h3>
            <p className="mb-4 text-sm leading-relaxed">
              While it is frightening to be in a situation where someone is choking, providing some sort of intervention is better than nothing. The least one can do is call 9-1-1 and try to practice the skills documented here that were obtained from prestigious medical websites such as the Red Cross, Healthline and WebMD. There are many educational videos online as well for visual learners.
            </p>
            <p className="mb-4 text-sm leading-relaxed">
              In the event you are unable to communicate to First Responders or a rescue team, your ICE Tracer card or device will play the role of sharing your emergency contact information for notification and medical history that you have added to your profile. Don't leave your medical care to chance.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-[#CA0015] text-white px-6 py-2 rounded font-bold hover:bg-[#a8000f] transition-colors text-sm"
            >
              Get ICE Tracer Today
            </Link>
            <p className="text-xs text-white/90 mt-3">
              For more information on our products and services, please email our team at{" "}
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
            <Link href="/blog/what-is-ice-tracer" className="block hover:opacity-80 transition-opacity">
              <div className="border rounded-lg overflow-hidden">
                <Image
                  src="/images/What_is_ICE_Blog.png"
                  alt="Emergency sign highlighting medical information"
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs text-gray-500">June 30th, 2017 • 2 min read</span>
                  <h3 className="font-bold text-[#245789] mt-1">What is ICE Tracer?</h3>
                  <p className="text-sm text-gray-600 mt-2">Learn about ICE Tracer's comprehensive medical ID system and how it can help in emergency situations.</p>
                </div>
              </div>
            </Link>
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
                  <p className="text-sm text-gray-600 mt-2">Understanding the most common reasons people call emergency medical services and how to prepare.</p>
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