'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "General Information",
    items: [
      {
        question: "What is a medical ID bracelet?",
        answer: "A medical ID bracelet is a piece of jewelry that contains important medical information about the wearer, such as allergies, medical conditions, and emergency contact details. This information can be crucial in a medical emergency when the wearer is unable to communicate."
      },
      {
        question: "Why should I wear a medical ID bracelet?",
        answer: "Wearing a medical ID bracelet ensures that first responders and medical personnel can quickly access vital health information, which can lead to faster and more accurate treatment. It can be life-saving in situations where every second counts."
      },
      {
        question: "Who needs a medical ID bracelet?",
        answer: "Individuals with chronic medical conditions (e.g., diabetes, epilepsy, heart conditions), severe allergies, those taking specific medications, or anyone who wants their medical information to be readily available in an emergency should consider wearing a medical ID bracelet."
      }
    ]
  },
  {
    title: "Product Information",
    items: [
      {
        question: "What types of medical ID bracelets do you offer?",
        answer: "We offer a variety of medical ID bracelets, including traditional metal bracelets, silicone bands, leather bands, and more. Each type is designed to cater to different preferences and lifestyles."
      },
      {
        question: "What materials are your bracelets made from?",
        answer: "Our bracelets are made from high-quality materials such as stainless steel, sterling silver, silicone, leather, and titanium. Each material offers different benefits in terms of durability, comfort, and style."
      },
      {
        question: "Can I customize my medical ID bracelet?",
        answer: "Yes, you can customize your medical ID bracelet with specific medical information, emergency contacts, and even choose from various design options to suit your personal style."
      }
    ]
  },
  {
    title: "Ordering and Shipping",
    items: [
      {
        question: "How do I place an order?",
        answer: "To place an order, simply browse our website, select your preferred bracelet style and customization options, and add the item to your cart. Follow the checkout process to complete your purchase."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods, including credit/debit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options."
      },
      {
        question: "How long does shipping take?",
        answer: "Shipping times vary based on your location and the shipping method selected. Generally, standard shipping within the continental U.S. takes 5-7 business days, while expedited options are available for faster delivery."
      },
      {
        question: "Do you offer international shipping?",
        answer: "Yes, we offer international shipping to many countries. Shipping times and costs will vary based on the destination."
      }
    ]
  },
  {
    title: "Customization",
    items: [
      {
        question: "What information should I include on my medical ID bracelet?",
        answer: "Include critical medical information such as medical conditions, allergies, medications, and emergency contact numbers. Ensure the information is concise and clear."
      },
      {
        question: "Can I choose the design and color of my bracelet?",
        answer: "Yes, we offer various designs and colors for you to choose from. You can select a style that best matches your personal preferences and lifestyle needs."
      },
      {
        question: "How do I add or update information on my bracelet?",
        answer: "When placing an order, you can provide the information you want engraved. If you need to update the information later, contact our customer support for assistance with re-engraving or purchasing a new plate."
      }
    ]
  },
  {
    title: "Sizing and Fit",
    items: [
      {
        question: "How do I determine the correct size for my bracelet?",
        answer: "To find the right size, measure your wrist with a flexible tape measure or a piece of string, then check our sizing chart to select the appropriate bracelet size."
      },
      {
        question: "What if my bracelet doesn't fit?",
        answer: "If your bracelet doesn't fit, you can return it for an exchange. Please refer to our return policy for specific instructions and guidelines."
      }
    ]
  },
  {
    title: "Care and Maintenance",
    items: [
      {
        question: "How do I clean and maintain my medical ID bracelet?",
        answer: "Clean your bracelet regularly with mild soap and water. Avoid harsh chemicals that could damage the engraving or material. For metal bracelets, a polishing cloth can help maintain their shine."
      },
      {
        question: "Is the engraving on the bracelet durable?",
        answer: "Yes, our engravings are designed to be long-lasting and resistant to wear. We use high-quality engraving techniques to ensure that your information remains legible."
      }
    ]
  },
  {
    title: "Returns and Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We offer a hassle-free return policy. If you are not satisfied with your purchase, you can return it within 30 days for a refund or exchange. Custom engraved items may have different return conditions, so please check our policy details."
      },
      {
        question: "How do I exchange my bracelet for a different size or style?",
        answer: "To exchange your bracelet, contact our customer support team for instructions. Ensure that the item is in its original condition and packaging."
      }
    ]
  },
  {
    title: "Special Features",
    items: [
      {
        question: "Do you offer bracelets with QR codes or NFC technology?",
        answer: "Yes, we offer bracelets that incorporate QR codes or NFC technology, allowing first responders to access your detailed medical profile via a smartphone or other devices."
      },
      {
        question: "How do your bracelets integrate with medical apps or services?",
        answer: "Our bracelets can be linked to your medical profile stored on secure servers, which can be accessed through QR codes or NFC. This integration allows for easy updates and detailed information sharing in emergencies."
      }
    ]
  },
  {
    title: "Safety and Security",
    items: [
      {
        question: "How secure is the information on my medical ID bracelet?",
        answer: "We prioritize your privacy and security. Information stored in QR codes or NFC tags is encrypted, and access is restricted to authorized personnel. Physical engravings are concise and limited to essential data."
      },
      {
        question: "How do first responders use the information on my bracelet?",
        answer: "First responders are trained to look for medical ID bracelets. They will read the engraved information or scan the QR code/NFC tag to access your medical details, which helps them provide appropriate care quickly."
      }
    ]
  },
  {
    title: "Customer Support",
    items: [
      {
        question: "How can I contact customer support?",
        answer: "You can contact our customer support team via email, phone, or live chat on our website. Our team is available to assist you with any questions or issues you may have."
      },
      {
        question: "What should I do if I have an issue with my order?",
        answer: "If you encounter any problems with your order, please reach out to our customer support team immediately. We will work to resolve the issue promptly and ensure your satisfaction."
      }
    ]
  }
];

function AccordionItem({ question, answer, isOpen, onToggle }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  return (
    <Card variant="outline" className="mb-4">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-[#245789] focus:ring-offset-2 rounded-lg"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#245789] pr-4">{question}</h3>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 text-[#245789] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </Card>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <Section background="blue" padding="lg" animate>
        <Container>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about ICE Tracer medical ID bracelets, our services, and how we can help keep you safe.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Content */}
      <Section background="white" padding="xl" animate>
        <Container>
          <div className="max-w-4xl mx-auto">
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-8 border-b-2 border-[#245789] pb-4">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const key = `${categoryIndex}-${itemIndex}`;
                    return (
                      <AccordionItem
                        key={key}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems[key] || false}
                        onToggle={() => toggleItem(key)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Call to Action Section */}
      <Section background="gray-light" padding="lg" animate>
        <Container>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#245789] mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Our customer support team is here to help. Contact us directly for personalized assistance with your medical ID needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Contact Support
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                View Plans
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 