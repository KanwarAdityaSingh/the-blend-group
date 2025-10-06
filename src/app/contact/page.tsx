"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
  User,
  Building
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/ThreeJS/FloatingParticles";

// Hero Section
function ContactHero() {
  return (
    <motion.section
      className="relative h-[10vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
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

// Interactive Text Component
function InteractiveText() {
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    "Transform your ideas into digital masterpieces",
    "Build products that users love and remember",
    "Scale your business with intelligent solutions",
    "Create experiences that inspire and engage"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="space-y-8">
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl brand-hero-alt text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Let's Connect
      </motion.h1>
      
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <motion.p
          key={currentText}
          className="text-xl text-foreground/80 brand-tech"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {texts[currentText]}
        </motion.p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-pink to-lavender rounded-full animate-pulse-glow" />
            <span className="text-foreground/60">24/7 Support Available</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-pink to-lavender rounded-full animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
            <span className="text-foreground/60">Free Initial Consultation</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-pink to-lavender rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
            <span className="text-foreground/60">Custom Solutions for Every Need</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Contact Form
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="glass rounded-3xl p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-gradient-to-r from-pink to-lavender rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gradient mb-4">Message Sent!</h3>
        <p className="text-foreground/70 mb-8">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <motion.button
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Another Message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="py-6 px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Interactive Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <InteractiveText />
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="glass rounded-3xl p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:border-pink transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:border-pink transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:border-pink transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:border-pink transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground focus:outline-none focus:border-pink transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="brand-identity">Brand & Identity</option>
                    <option value="web-development">Web Development</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="growth-marketing">Growth Marketing</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground focus:outline-none focus:border-pink transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5K</option>
                    <option value="5k-10k">$5K - $10K</option>
                    <option value="10k-25k">$10K - $25K</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k-plus">$50K+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-foreground/5 border border-foreground/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:border-pink transition-colors resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Contact Info
function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "hello@blendgroup.com",
      action: "mailto:hello@blendgroup.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team directly",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come see us in person",
      contact: "123 Design Street, Creative City, CC 12345",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're available Monday to Friday",
      contact: "9:00 AM - 6:00 PM PST",
      action: "#"
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
            Other Ways to Reach Us
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Prefer a different way to get in touch? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.action}
                className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group text-center"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink to-lavender rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gradient mb-2">{method.title}</h3>
                <p className="text-sm text-foreground/60 mb-3">{method.description}</p>
                <p className="text-sm text-foreground/80 font-medium">{method.contact}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a comprehensive digital transformation could take 3-6 months. We'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "What's your design process like?",
      answer: "Our process follows a proven 6-step methodology: Discovery, Strategy, Design, Development, Launch, and Growth. We involve you at every stage to ensure the final product exceeds your expectations."
    },
    {
      question: "Do you work with startups or only established companies?",
      answer: "We work with businesses of all sizes, from early-stage startups to Fortune 500 companies. Our flexible approach allows us to adapt our services to meet your specific needs and budget."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in modern web technologies including React, Next.js, Node.js, and cloud platforms. We also have extensive experience with AI integration, mobile development, and performance optimization."
    }
  ];

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are some common questions we receive.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              className="glass rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-gradient mb-4">{faq.question}</h3>
              <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
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

// Main Contact Page
export default function ContactPage() {
  return (
    <div className="relative">
      <Navbar />
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <FAQSection />
      <Footer />
    </div>
  );
}
