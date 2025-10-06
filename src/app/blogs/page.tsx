"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, User, Tag, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/ThreeJS/FloatingParticles";

// Hero Section
function BlogsHero() {
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
          Insights & Stories
        </motion.h1>
        <motion.p
          className="text-xl text-foreground/80 max-w-2xl mx-auto brand-tech"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Thoughts on design, technology, and the future of digital experiences.
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

// Featured Blog Post
function FeaturedPost() {
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
          className="glass rounded-3xl p-12 hover:shadow-glow transition-all duration-500 group"
          whileHover={{ y: -8 }}
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-gradient-to-r from-pink to-lavender text-white text-sm rounded-full">
                  Featured
                </span>
                <div className="flex items-center gap-2 text-foreground/60">
                  <Calendar size={16} />
                  <span className="text-sm">Dec 15, 2024</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/60">
                  <Clock size={16} />
                  <span className="text-sm">8 min read</span>
                </div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6 group-hover:underline transition-all duration-300">
                The Future of Design Systems in the AI Era
              </h2>
              
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                As artificial intelligence becomes more integrated into our design workflows, 
                we're witnessing a fundamental shift in how design systems are conceived, 
                maintained, and evolved. This comprehensive exploration examines the emerging 
                trends and technologies that are reshaping the landscape of digital design.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-pink to-lavender rounded-full flex items-center justify-center text-white font-bold">
                  AB
                </div>
                <div>
                  <p className="font-semibold text-foreground">Alex Bennett</p>
                  <p className="text-sm text-foreground/60">Lead Designer</p>
                </div>
              </div>
              
              <Link
                href="/blogs/the-future-of-design-systems"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300"
              >
                Read Full Article
                <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="lg:w-1/2">
              <div className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                <div className="text-8xl opacity-50">🎨</div>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 animate-pulse" style={{
                    backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
                    animation: 'shimmer 3s ease-in-out infinite',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Blog Posts Grid
function BlogPosts() {
  const posts = [
    {
      title: "Building for Performance: Why Speed Matters",
      excerpt: "Performance isn't just a technical metric—it's a fundamental aspect of user experience that directly impacts business outcomes.",
      author: "Sarah Chen",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Performance",
      image: "⚡"
    },
    {
      title: "The Art of Digital Minimalism",
      excerpt: "In an age of digital noise, the most powerful designs are often the simplest. Learn how to embrace minimalism without sacrificing functionality.",
      author: "Marcus Rodriguez",
      date: "Dec 5, 2024",
      readTime: "5 min read",
      category: "Design",
      image: "🎯"
    },
    {
      title: "AI-Powered Design: The New Frontier",
      excerpt: "Exploring how artificial intelligence is revolutionizing the creative process and what it means for designers.",
      author: "Emma Thompson",
      date: "Nov 28, 2024",
      readTime: "7 min read",
      category: "AI",
      image: "🤖"
    },
    {
      title: "Sustainable Web Design Practices",
      excerpt: "How to create beautiful, functional websites that are also environmentally conscious and energy-efficient.",
      author: "David Kim",
      date: "Nov 20, 2024",
      readTime: "8 min read",
      category: "Sustainability",
      image: "🌱"
    },
    {
      title: "The Psychology of Color in Digital Products",
      excerpt: "Understanding how color choices influence user behavior and emotional responses in digital interfaces.",
      author: "Lisa Park",
      date: "Nov 15, 2024",
      readTime: "6 min read",
      category: "Psychology",
      image: "🎨"
    },
    {
      title: "Micro-interactions: The Details That Matter",
      excerpt: "Small animations and transitions can make the difference between a good product and a great one.",
      author: "James Wilson",
      date: "Nov 8, 2024",
      readTime: "5 min read",
      category: "UX",
      image: "✨"
    }
  ];

  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Latest Insights
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Deep dives into design, technology, and the future of digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
            >
              <div className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <div className="text-4xl opacity-50">{post.image}</div>
                {/* Subtle animated background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
                  }} />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-pink/20 to-lavender/20 text-foreground text-sm rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-foreground/60">
                  <Calendar size={14} />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/60">
                  <Clock size={14} />
                  <span className="text-sm">{post.readTime}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gradient mb-3 group-hover:underline transition-all duration-300">
                {post.title}
              </h3>
              
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink to-lavender rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm text-foreground/60">{post.author}</span>
                </div>
                <Link href="/blogs/the-future-of-design-systems">
                  <ArrowRight size={16} className="text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Newsletter Section
function NewsletterSection() {
  return (
    <motion.section
      className="py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Get the latest insights on design, technology, and digital innovation delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-foreground/5 border border-foreground/20 rounded-full text-foreground placeholder-foreground/50 focus:outline-none focus:border-pink transition-colors"
            />
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-pink to-lavender text-white rounded-full font-medium hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
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

// Main Blogs Page
export default function BlogsPage() {
  return (
    <div className="relative">
      <Navbar />
      <BlogsHero />
      <FeaturedPost />
      <BlogPosts />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
