"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Rocket, 
  Star, 
  Trophy, 
  MessageCircle, 
  Bot, 
  Zap, 
  Sparkles,
  Palette,
  Code,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroOrb from "@/components/ThreeJS/HeroOrb";
import ParticleFlow from "@/components/ThreeJS/ParticleFlow";
import GradientMesh from "@/components/ThreeJS/GradientMesh";
import FloatingParticles from "@/components/ThreeJS/FloatingParticles";

// Hero Section
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ y }}
    >
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-6xl sm:text-8xl md:text-9xl brand-hero-alt mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          The Blend Group
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-foreground/80 brand-tech"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Cut through the noise.
        </motion.p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <HeroOrb />
          </Suspense>
        </Canvas>
      </div>
    </motion.section>
  );
}

// About Section - Marketing Focused
function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const stats = [
    { number: "500+", label: "Projects Delivered", icon: Rocket, color: "text-pink" },
    { number: "99%", label: "Client Satisfaction", icon: Star, color: "text-lavender" },
    { number: "50+", label: "Awards Won", icon: Trophy, color: "text-pink" },
    { number: "24/7", label: "Support Available", icon: MessageCircle, color: "text-lavender" }
  ];

  const features = [
    {
      title: "AI-Powered Design",
      description: "Leverage cutting-edge AI to create designs that adapt and evolve with your brand.",
      icon: Bot,
      color: "text-pink"
    },
    {
      title: "Lightning Fast",
      description: "Optimized for speed and performance. Your users will notice the difference.",
      icon: Zap,
      color: "text-lavender"
    },
    {
      title: "Future-Proof",
      description: "Built with tomorrow in mind. Scalable, maintainable, and always up-to-date.",
      icon: Sparkles,
      color: "text-pink"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            className="space-y-8"
            style={{ y }}
          >
            <div className="space-y-4">
              <motion.span
                className="inline-block px-4 py-2 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-full text-sm font-medium text-gradient border border-pink/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Trusted by 500+ Companies
              </motion.span>
              <h2 className="text-5xl sm:text-6xl font-bold brand-hero-alt leading-tight">
                Where Innovation Meets Impact
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                We don't just build websites—we craft digital experiences that drive results. 
                From startups to Fortune 500s, we've helped businesses cut through the noise 
                and connect with their audience in meaningful ways.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Start Your Project
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                View Our Work
              </motion.button>
            </div>
          </motion.div>

          <div className="relative h-96 lg:h-[500px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <ParticleFlow />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 ${stat.color} flex items-center justify-center`}>
                  <IconComponent size={32} />
                </div>
                <div className="text-3xl font-bold text-gradient mb-1">{stat.number}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 mb-4 ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gradient mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Services Section - Enhanced Marketing
function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const services = [
    {
      title: "Brand & Identity",
      description: "Complete brand ecosystems that tell your story and drive engagement.",
      icon: Palette,
      color: "text-pink",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
      price: "From $5K"
    },
    {
      title: "Web Development",
      description: "Lightning-fast, scalable websites that convert visitors into customers.",
      icon: Code,
      color: "text-lavender",
      features: ["Custom Development", "E-commerce", "CMS Integration", "Performance Optimization"],
      price: "From $8K"
    },
    {
      title: "AI Integration",
      description: "Intelligent automation and AI-powered features that set you apart.",
      icon: Bot,
      color: "text-pink",
      features: ["Chatbots", "Predictive Analytics", "Automation", "Machine Learning"],
      price: "From $10K"
    },
    {
      title: "Growth Marketing",
      description: "Data-driven strategies that accelerate your business growth.",
      icon: TrendingUp,
      color: "text-lavender",
      features: ["SEO/SEM", "Social Media", "Analytics", "Conversion Optimization"],
      price: "From $3K/mo"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="services"
      className="relative py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ y }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gradient-to-r from-pink/20 to-lavender/20 rounded-full text-sm font-medium text-gradient border border-pink/30 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Services
          </motion.span>
          <h2 className="text-5xl sm:text-6xl font-bold brand-hero-alt mb-6">
            Complete Digital Solutions
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide end-to-end digital solutions that drive real business results. 
            No project is too big or too small.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-4 ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={40} />
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
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink to-lavender rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm font-medium text-gradient">
                    {service.price}
                  </div>
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink/5 to-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center glass rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gradient mb-4">
            Ready to Transform Your Digital Presence?
          </h3>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Free Consultation
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-medium hover:bg-foreground/5 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Case Studies
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <GradientMesh />
          </Suspense>
        </Canvas>
      </div>
    </motion.section>
  );
}

// Video Section
function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink/20 via-lavender/20 to-white/20" />
      
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y }}
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-gradient mb-6">
          Where design meets performance
        </h2>
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          Every pixel, every interaction, every moment crafted with intention.
        </p>
      </motion.div>
    </motion.section>
  );
}

// Clients Section
function ClientsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const clients = [
    {
      name: "TechFlow",
      logo: "TF",
      industry: "Fintech",
      testimonial: "Blend transformed our digital presence. The results speak for themselves.",
      author: "Sarah Chen, CEO"
    },
    {
      name: "Nexus Labs",
      logo: "NL", 
      industry: "AI/ML",
      testimonial: "Exceptional work. They understood our vision and brought it to life.",
      author: "Marcus Rodriguez, CTO"
    },
    {
      name: "EcoVibe",
      logo: "EV",
      industry: "Sustainability",
      testimonial: "Professional, creative, and results-driven. Highly recommended.",
      author: "Emma Thompson, Founder"
    },
    {
      name: "Quantum Systems",
      logo: "QS",
      industry: "Enterprise",
      testimonial: "The best design team we've worked with. Truly outstanding.",
      author: "David Kim, VP Product"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="clients"
      className="relative py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ y }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We've had the privilege of working with innovative companies across various industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink to-lavender rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                {client.logo}
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gradient mb-2">{client.name}</h3>
              <p className="text-sm text-foreground/60 mb-4">{client.industry}</p>
              <p className="text-sm text-foreground/70 italic mb-3">"{client.testimonial}"</p>
              <p className="text-xs text-foreground/50">{client.author}</p>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          className="text-center"
          style={{ y }}
        >
          <p className="text-sm text-foreground/60 mb-8">And many more...</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-foreground/40">Microsoft</div>
            <div className="text-2xl font-bold text-foreground/40">Google</div>
            <div className="text-2xl font-bold text-foreground/40">Apple</div>
            <div className="text-2xl font-bold text-foreground/40">Tesla</div>
            <div className="text-2xl font-bold text-foreground/40">Netflix</div>
            <div className="text-2xl font-bold text-foreground/40">Spotify</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Blogs Section
function BlogsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const blogs = [
    {
      title: "The Future of Design Systems",
      description: "Exploring how design systems will evolve in the AI era.",
      date: "Dec 2024"
    },
    {
      title: "Building for Performance",
      description: "Why performance is a design decision, not an afterthought.",
      date: "Nov 2024"
    },
    {
      title: "The Art of Digital Minimalism",
      description: "Less is more in an age of digital noise.",
      date: "Oct 2024"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="blogs"
      className="relative py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ y }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Insights
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Thoughts on design, technology, and the future of digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.title}
              className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-sm text-foreground/60 mb-3">{blog.date}</div>
              <h3 className="text-xl font-semibold text-gradient mb-3 group-hover:underline transition-all duration-300">
                {blog.title}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {blog.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* CTA to Blogs Page */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Insights
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Contact Section
function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.section
      ref={containerRef}
      id="contact"
      className="relative py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="space-y-8"
          style={{ y }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-gradient mb-6">
            Let's Build What Matters
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-12">
            Ready to cut through the noise? Let's create something extraordinary together.
          </p>
          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium text-lg hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project
          </motion.button>
        </motion.div>
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

// Footer
function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-2xl font-bold brand-title text-gradient mb-4 md:mb-0">
          BLEND
        </div>
        <div className="flex items-center space-x-8 text-sm text-foreground/60">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-foreground/5 text-center text-sm text-foreground/40">
        © 2024 The Blend Group. All rights reserved.
      </div>
    </footer>
  );
}

// Main Page
export default function MainPage() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <VideoSection />
      <ClientsSection />
      <BlogsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}