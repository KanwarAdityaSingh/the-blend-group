"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Filter,
  Search,
  Eye,
  Heart,
  Share2,
  Leaf,
  Gem,
  BarChart3,
  Smartphone,
  ShoppingCart,
  Bot
} from "lucide-react";
import Navbar from "@/components/Navbar";
import GradientMesh from "@/components/ThreeJS/GradientMesh";
import FloatingParticles from "@/components/ThreeJS/FloatingParticles";

// Hero Section
function PortfolioHero() {
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
          Our Portfolio
        </motion.h1>
        <motion.p
          className="text-xl text-foreground/80 max-w-2xl mx-auto brand-tech"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Selected projects that showcase our approach to design and development.
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

// Filter Section
function FilterSection({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: (filter: string) => void }) {
  const filters = ["All", "Web Design", "Mobile Apps", "Branding", "E-commerce", "AI/ML"];

  return (
    <motion.section
      className="py-12 px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-pink to-lavender text-white shadow-glow'
                  : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Portfolio Grid
function PortfolioGrid({ activeFilter }: { activeFilter: string }) {
  const projects = [
    {
      id: 1,
      title: "EcoFlow Platform",
      description: "Sustainable energy management dashboard with real-time analytics and AI-powered insights.",
      category: "Web Design",
      icon: Leaf,
      color: "text-green-500",
      tags: ["React", "Node.js", "AI", "Analytics"],
      year: "2024",
      featured: true,
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "Nexus Design System",
      description: "Comprehensive design language for fintech applications with 50+ components.",
      category: "Branding",
      icon: Gem,
      color: "text-blue-500",
      tags: ["Figma", "Design System", "Fintech"],
      year: "2024",
      featured: true,
      link: "#",
      github: "#"
    },
    {
      id: 3,
      title: "Quantum Analytics",
      description: "Real-time data visualization suite with interactive dashboards and reporting.",
      category: "Web Design",
      icon: BarChart3,
      color: "text-purple-500",
      tags: ["D3.js", "Python", "Data Viz"],
      year: "2023",
      featured: false,
      link: "#",
      github: "#"
    },
    {
      id: 4,
      title: "Aurora Mobile",
      description: "Next-gen mobile banking experience with biometric authentication and AI chat.",
      category: "Mobile Apps",
      icon: Smartphone,
      color: "text-cyan-500",
      tags: ["React Native", "AI", "Banking"],
      year: "2024",
      featured: true,
      link: "#",
      github: "#"
    },
    {
      id: 5,
      title: "Zenith E-commerce",
      description: "High-performance e-commerce platform with advanced search and recommendation engine.",
      category: "E-commerce",
      icon: ShoppingCart,
      color: "text-orange-500",
      tags: ["Next.js", "Stripe", "Search"],
      year: "2023",
      featured: false,
      link: "#",
      github: "#"
    },
    {
      id: 6,
      title: "Neural Voice Assistant",
      description: "AI-powered voice assistant with natural language processing and smart home integration.",
      category: "AI/ML",
      icon: Bot,
      color: "text-pink-500",
      tags: ["Python", "NLP", "IoT"],
      year: "2024",
      featured: false,
      link: "#",
      github: "#"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                className={`glass rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500 group ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative">
                  <div className={`aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 flex items-center justify-center relative overflow-hidden ${
                    project.featured ? 'lg:aspect-[2/1]' : ''
                  }`}>
                    <div className={`w-20 h-20 ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent size={48} />
                    </div>
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
                      }} />
                    </div>
                  </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={16} />
                  </motion.button>
                  <motion.button
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={16} />
                  </motion.button>
                </div>
                
                {/* Project Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{project.category}</span>
                    <span className="text-xs opacity-70">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{project.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <motion.a
                      href={project.link}
                      className="flex items-center gap-2 text-sm font-medium hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      <ExternalLink size={16} />
                      View Project
                    </motion.a>
                    <motion.a
                      href={project.github}
                      className="flex items-center gap-2 text-sm font-medium hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-gradient-to-r from-pink/20 to-lavender/20 text-foreground px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs text-foreground/60">{project.year}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gradient mb-2 group-hover:underline transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-foreground/5 text-foreground/60 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <motion.a
                    href={project.link}
                    className="flex items-center gap-2 text-sm font-medium text-gradient hover:underline"
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink size={16} />
                    View Project
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: "🎯" },
    { number: "50+", label: "Happy Clients", icon: "😊" },
    { number: "99%", label: "Client Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🛠️" }
  ];

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Our Impact
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and client success.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-8 text-center hover:shadow-glow transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
              <div className="text-sm text-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="glass rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and bring your vision to life with our expertise.
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
              View Case Studies
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

// Main Portfolio Page
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="relative">
      <Navbar />
      <PortfolioHero />
      <FilterSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <PortfolioGrid activeFilter={activeFilter} />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
