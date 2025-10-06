"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Palette, 
  Code, 
  Bot, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Star,
  Zap,
  Shield,
  Users,
  Target,
  Lightbulb
} from "lucide-react";
import Navbar from "@/components/Navbar";
import GradientMesh from "@/components/ThreeJS/GradientMesh";
import FloatingParticles from "@/components/ThreeJS/FloatingParticles";

// Hero Section
function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      style={{ y }}
    >
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl brand-hero-alt mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-xl text-foreground/80 max-w-2xl mx-auto brand-tech"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Comprehensive digital solutions that drive real business results.
        </motion.p>
      </div>

      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <FloatingParticles />
          </Suspense>
        </Canvas>
      </div>
    </motion.section>
  );
}

// Services Overview
function ServicesOverview() {
  const services = [
    {
      title: "Brand & Identity",
      description: "Complete brand ecosystems that tell your story and drive engagement.",
      icon: Palette,
      color: "text-pink",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
      price: "From $5K",
      popular: false
    },
    {
      title: "Web Development",
      description: "Lightning-fast, scalable websites that convert visitors into customers.",
      icon: Code,
      color: "text-lavender",
      features: ["Custom Development", "E-commerce", "CMS Integration", "Performance Optimization"],
      price: "From $8K",
      popular: true
    },
    {
      title: "AI Integration",
      description: "Intelligent automation and AI-powered features that set you apart.",
      icon: Bot,
      color: "text-pink",
      features: ["Chatbots", "Predictive Analytics", "Automation", "Machine Learning"],
      price: "From $10K",
      popular: false
    },
    {
      title: "Growth Marketing",
      description: "Data-driven strategies that accelerate your business growth.",
      icon: TrendingUp,
      color: "text-lavender",
      features: ["SEO/SEM", "Social Media", "Analytics", "Conversion Optimization"],
      price: "From $3K/mo",
      popular: false
    }
  ];

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            What We Do Best
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            From concept to launch, we provide end-to-end digital solutions that drive real business results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                className={`glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group relative overflow-hidden ${
                  service.popular ? 'ring-2 ring-pink/50' : ''
                }`}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-pink to-lavender text-white text-sm rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-4 ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden rounded-full`}>
                    <IconComponent size={40} />
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gradient mb-3">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-foreground/60">
                        <Check size={12} className="text-pink" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm font-medium text-gradient mb-4">
                    {service.price}
                  </div>
                  
                  <motion.button
                    className="w-full px-4 py-2 bg-gradient-to-r from-pink to-lavender text-white rounded-full text-sm font-medium hover:shadow-glow transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink/5 to-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// Process Section
function ProcessSection() {
  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We dive deep into your business goals, target audience, and competitive landscape.",
      icon: Lightbulb,
      color: "text-pink"
    },
    {
      step: "02", 
      title: "Strategy",
      description: "Based on insights, we craft a comprehensive strategy tailored to your objectives.",
      icon: Target,
      color: "text-lavender"
    },
    {
      step: "03",
      title: "Design",
      description: "Our team creates stunning visuals and user experiences that resonate with your brand.",
      icon: Palette,
      color: "text-pink"
    },
    {
      step: "04",
      title: "Development",
      description: "We bring designs to life with clean, scalable, and performant code.",
      icon: Code,
      color: "text-lavender"
    },
    {
      step: "05",
      title: "Launch",
      description: "We ensure everything works perfectly before launching your project to the world.",
      icon: Zap,
      color: "text-pink"
    },
    {
      step: "06",
      title: "Growth",
      description: "Ongoing optimization and support to ensure your success continues to grow.",
      icon: TrendingUp,
      color: "text-lavender"
    }
  ];

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Our Process
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A proven methodology that ensures every project delivers exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {process.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.step}
                className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group text-center"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 ${step.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden rounded-full`}>
                  <IconComponent size={32} />
                  {/* Subtle animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold text-gradient mb-3">{step.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// Why Choose Us
function WhyChooseUs() {
  const benefits = [
    {
      title: "Proven Track Record",
      description: "500+ successful projects delivered across various industries.",
      icon: Star,
      color: "text-pink"
    },
    {
      title: "Expert Team",
      description: "Hand-picked designers, developers, and strategists with years of experience.",
      icon: Users,
      color: "text-lavender"
    },
    {
      title: "Cutting-Edge Technology",
      description: "We use the latest tools and technologies to build future-proof solutions.",
      icon: Zap,
      color: "text-pink"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support to ensure your project runs smoothly.",
      icon: Shield,
      color: "text-lavender"
    }
  ];

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Why Choose Blend?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We combine creativity with technical excellence to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group text-center"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 ${benefit.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gradient mb-3">{benefit.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// CTA Section
function CTASection() {
  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="glass rounded-3xl p-12"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Call
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-2xl font-bold brand-title text-gradient mb-4 md:mb-0">
          BLEND
        </div>
        <div className="flex items-center space-x-8 text-sm text-foreground/60">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <a href="/services" className="hover:text-foreground transition-colors">Services</a>
          <a href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="/blogs" className="hover:text-foreground transition-colors">Blogs</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-foreground/5 text-center text-sm text-foreground/40">
        © 2024 The Blend Group. All rights reserved.
      </div>
    </footer>
  );
}

// Main Services Page
export default function ServicesPage() {
  return (
    <div className="relative">
      <Navbar />
      <ServicesHero />
      <ServicesOverview />
      <ProcessSection />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
}
