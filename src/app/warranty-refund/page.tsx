'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

export default function WarrantyRefundPage() {
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
              Warranty & Refund Policy
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              We stand behind our products and want you to be completely satisfied with your ICE Tracer medical ID bracelet.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section background="white" padding="xl" animate>
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Warranty Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-[#245789] border-b-2 border-[#245789] pb-4 mb-6">
                    Warranty
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    We are committed to providing high-quality medical ID bracelets that you can rely on. Our products come with a <strong className="text-[#245789]">one-year warranty</strong> covering any defects in materials and workmanship. If you experience any issues with your bracelet due to manufacturing defects within the first year, we will repair or replace it free of charge.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* What is Covered */}
                    <div>
                      <h3 className="text-xl font-bold text-[#245789] mb-4 flex items-center">
                        <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        What is Covered
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#245789] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Defects in materials (e.g., metal, silicone, leather)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#245789] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Defects in workmanship (e.g., engraving errors, clasp issues)</span>
                        </li>
                      </ul>
                    </div>

                    {/* What is Not Covered */}
                    <div>
                      <h3 className="text-xl font-bold text-[#245789] mb-4 flex items-center">
                        <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        What is Not Covered
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Normal wear and tear</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Damage caused by misuse or improper care</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">Lost or stolen items</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-[#245789] mb-2">Making a Warranty Claim</h4>
                    <p className="text-gray-700">
                      To make a warranty claim, please contact our customer support team with your order number and a description of the issue. We may request photos of the defect to process your claim efficiently.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Refund Policy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-[#245789] border-b-2 border-[#245789] pb-4 mb-6">
                    Refund Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    We want you to be completely satisfied with your purchase. If you are not happy with your medical ID bracelet, you may return it within <strong className="text-[#245789]">30 days of receipt</strong> for a full refund or exchange, subject to the conditions outlined below.
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#245789] mb-4">Refund Conditions</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-[#245789] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <p className="text-gray-700">The item must be in its original condition and packaging.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-[#245789] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        <p className="text-gray-700">Custom engraved items may be subject to a restocking fee or may not be eligible for a refund, depending on the nature of the customization.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#245789] mb-4">How to Return an Item</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <p className="text-gray-700">Contact our customer support team to initiate a return.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        <p className="text-gray-700">You will receive a return authorization and instructions on how to send the item back to us.</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                        <p className="text-gray-700">Once we receive the returned item and verify its condition, we will process your refund to the original payment method within 7-10 business days.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Exchanges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-[#245789] border-b-2 border-[#245789] pb-4 mb-6">
                    Exchanges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    If you need to exchange your bracelet for a different size or style, please follow the same steps as for a return. Indicate that you would like an exchange, and specify the new size or style you need. We will process the exchange once we receive the original item.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-r from-[#245789] to-[#1e4a75] text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-white border-b-2 border-white pb-4 mb-6">
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/95 text-lg leading-relaxed mb-6">
                    For warranty claims, returns, or exchanges, please contact our customer support team:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="font-semibold">Email</span>
                      </div>
                      <p className="text-white/95 ml-9">support@icetracer.com</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="font-semibold">Phone</span>
                      </div>
                      <p className="text-white/95 ml-9">(800) 213-4803</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <svg className="w-6 h-6 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-semibold block">Business Hours</span>
                      <span className="text-white/95">Monday – Friday, 9 AM – 5 PM (EST)</span>
                    </div>
                  </div>

                  <p className="text-white/95 text-lg leading-relaxed">
                    We are dedicated to ensuring you have a positive experience with our products and services. If you have any questions or need further assistance, please do not hesitate to reach out to us.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Shop with confidence knowing that your satisfaction is our priority. Get your ICE Tracer medical ID bracelet today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Contact Support
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