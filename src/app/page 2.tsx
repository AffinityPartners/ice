'use client'

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Container } from "@/components/layout/Container"
import { CheckCircle, Heart, Shield, Smartphone, Users, Clock, Star } from "lucide-react"

// Animation variants for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Enhanced Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      transition={{ delay }}
    >
      <Card className="h-full p-6 text-center group hover:shadow-lg transition-shadow">
        <CardContent className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#245789] to-[#CA0015] flex items-center justify-center text-white">
            {icon}
          </div>
          <CardTitle className="text-xl text-[#245789] group-hover:text-[#CA0015] transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced Testimonial Component
interface TestimonialProps {
  quote: string
  author: string
  location: string
  rating: number
}

function TestimonialCard({ quote, author, location, rating }: TestimonialProps) {
  return (
    <Card className="h-full glass-effect">
      <CardContent className="p-8">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#245789] to-[#CA0015] flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="font-semibold text-[#245789]">{author}</div>
            <div className="text-sm text-gray-600">{location}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Plan Card Component
interface PlanCardProps {
  name: string
  price: number
  profiles: number
  features: string[]
  highlighted?: boolean
}

function PlanCard({ name, price, profiles, features, highlighted = false }: PlanCardProps) {
  return (
    <Card 
      className={`h-full hover:shadow-lg transition-shadow ${highlighted ? 'ring-2 ring-[#CA0015] bg-gradient-to-br from-[#245789] to-blue-700 text-white' : ''}`}
    >
      <CardHeader className="text-center">
        <CardTitle className={`text-3xl ${highlighted ? 'text-white' : 'text-[#245789]'}`}>
          {name}
        </CardTitle>
        <div className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-[#245789]'}`}>
          ${price}<span className="text-lg font-normal">/mo</span>
        </div>
        <CardDescription className={highlighted ? 'text-white/90' : 'text-gray-600'}>
          Manage Up to {profiles} Profiles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className={`w-5 h-5 mr-3 ${highlighted ? 'text-white' : 'text-[#245789]'}`} />
            <span className={highlighted ? 'text-white' : 'text-gray-700'}>{feature}</span>
          </div>
        ))}
        <Button 
          className={`w-full mt-6 ${highlighted ? 'bg-[#CA0015] hover:bg-red-700' : ''}`}
          variant={highlighted ? 'default' : 'outline'}
          size="lg"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Military-Grade Security",
      description: "Your medical data is protected with the highest level of encryption, ensuring complete privacy and security."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Instant Access",
      description: "First responders can access your critical medical information anytime, anywhere in seconds."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Management",
      description: "Manage multiple family member profiles from a single account with unlimited updates."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Multiple Access Points",
      description: "Access through wearable devices, ID cards, or QR codes for maximum convenience."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Comprehensive Health Data",
      description: "Store allergies, medications, conditions, emergency contacts, and critical medical history."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "HIPAA Compliant",
      description: "Fully compliant with healthcare privacy regulations and security standards."
    }
  ]

  const testimonials = [
    {
      quote: "ICE Tracer gave me peace of mind. As someone with medical conditions, knowing my information is accessible to first responders is invaluable.",
      author: "Charlotte",
      location: "Boston, MA",
      rating: 5
    },
    {
      quote: "The user-friendly platform and comprehensive medical storage make ICE Tracer essential for anyone prioritizing safety and well-being.",
      author: "Benny",
      location: "Irving, TX", 
      rating: 5
    },
    {
      quote: "Secure, reliable, and efficient. ICE Tracer ensures my critical medical information is always available when needed most.",
      author: "Sam",
      location: "Hartford, CT",
      rating: 5
    }
  ]

  const plans = [
    {
      name: "Bronze",
      price: 4.99,
      profiles: 3,
      features: [
        "Personal Information",
        "Medical Conditions",
        "Allergies & Medications", 
        "Emergency Contacts",
        "Insurance Information",
        "Medical History",
        "Document Storage"
      ]
    },
    {
      name: "Silver", 
      price: 11.99,
      profiles: 10,
      features: [
        "Everything in Bronze",
        "Advanced Directives",
        "Multiple Device Linking",
        "Priority Support",
        "Family Sharing",
        "Medical Provider Access",
        "Unlimited Updates"
      ],
      highlighted: true
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover"
          >
            <source src="/images/ICE-Tracer-Video-optimized.webm" type="video/webm" />
            <source src="/images/ICE-Tracer-Video-optimized.mp4" type="video/mp4" />
          </video>
          {!videoLoaded && (
            <div className="absolute inset-0 bg-[#245789] animate-pulse" />
          )}
        </div>

        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-10" />

        {/* Hero Content */}
        <Container className="relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">Dynamic Medical</span>
              <span className="block text-gradient">Emergency ID</span>
              <span className="block">Solution</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Advanced medical ID system providing seamless access to vital health information 
              for first responders <span className="text-yellow-400 font-semibold">anytime, anywhere</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-glow">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#245789]">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Value Proposition Banner */}
      <section className="bg-gradient-brand py-16">
        <Container>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Immediate Access to Lifesaving Health Information 24/7
          </motion.h2>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#245789] mb-6">
              Why Choose ICE Tracer?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary cloud-based medical ID system trusted by thousands of families worldwide
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#245789] mb-6">
              How ICE Tracer Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to protect yourself and your loved ones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Set up detailed medical profiles including conditions, medications, allergies, and emergency contacts in minutes.",
                icon: <Users className="w-12 h-12" />
              },
              {
                step: "02", 
                title: "Get Your Device",
                description: "Receive your ICE Tracer wearable device or ID card with secure QR code access to your medical profile.",
                icon: <Smartphone className="w-12 h-12" />
              },
              {
                step: "03",
                title: "Emergency Ready",
                description: "First responders can instantly access your critical medical information when you need help most.",
                icon: <Heart className="w-12 h-12" />
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#245789] to-[#CA0015] flex items-center justify-center text-white mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#CA0015] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#245789] mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#245789] mb-6">
              Choose Your Protection Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Affordable plans designed to keep your family safe and protected
            </p>
            <p className="text-[#245789] font-semibold">
              Easily manage multiple profiles under a single account
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                name={plan.name}
                price={plan.price}
                profiles={plan.profiles}
                features={plan.features}
                highlighted={plan.highlighted}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#245789] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#245789] via-blue-700 to-[#CA0015] opacity-90" />
        <Container className="relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join families worldwide who trust ICE Tracer for their emergency medical needs
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
                rating={testimonial.rating}
              />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#245789] mb-6">
              Don't Leave Your Medical Care to Chance
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Start your free trial today and take the first step towards ensuring your health 
              information is always within reach when it matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="btn-glow">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
} 