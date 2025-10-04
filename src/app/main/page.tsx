"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
          className="text-6xl sm:text-8xl md:text-9xl font-bold text-gradient mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          The Blend Group
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-foreground/80 font-light"
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

// About Section
function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="space-y-8"
          style={{ y }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient">
            Redefining how the digital world is built
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Not as scattered websites, but ecosystems that shape culture. 
            We blend design and technology to create experiences that cut through the noise 
            and connect with what truly matters.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
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
    </motion.section>
  );
}

// Services Section
function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const services = [
    {
      title: "Design & Identity",
      description: "Crafting visual narratives that resonate and inspire action.",
      icon: "🎨"
    },
    {
      title: "Development & Build",
      description: "Building robust, scalable solutions that perform flawlessly.",
      icon: "⚡"
    },
    {
      title: "Workflow Automation",
      description: "Streamlining processes to maximize efficiency and impact.",
      icon: "🔄"
    },
    {
      title: "AI Services",
      description: "Leveraging intelligence to create smarter experiences.",
      icon: "🤖"
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
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            What We Do
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We create digital experiences that matter, combining creativity with cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass rounded-2xl p-8 text-center hover:shadow-glow transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gradient mb-3">
                {service.title}
              </h3>
              <p className="text-foreground/70 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
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

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

// Portfolio Section
function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: "EcoFlow Platform",
      description: "Sustainable energy management dashboard",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Nexus Design System",
      description: "Comprehensive design language for fintech",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Quantum Analytics",
      description: "Real-time data visualization suite",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Aurora Mobile",
      description: "Next-gen mobile banking experience",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      id="portfolio"
      className="relative py-20 px-6"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ y }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Our Work
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Selected projects that showcase our approach to design and development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 hover:shadow-glow transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 flex items-center justify-center">
                <div className="text-6xl opacity-50">🎨</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm opacity-90">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
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

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
        <div className="text-2xl font-bold text-gradient mb-4 md:mb-0">
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
      <PortfolioSection />
      <BlogsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}