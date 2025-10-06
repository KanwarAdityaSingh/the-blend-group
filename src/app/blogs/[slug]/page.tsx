"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Heart, 
  Bookmark,
  Tag,
  Quote,
  Play,
  Image as ImageIcon,
  Code,
  Zap,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/ThreeJS/FloatingParticles";

// Article Hero
function ArticleHero({ article }: { article: any }) {
  return (
    <motion.section
      className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6 justify-center">
            <span className="px-3 py-1 bg-gradient-to-r from-pink/20 to-lavender/20 text-foreground text-sm rounded-full border border-pink/30">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-foreground/60">
              <Calendar size={16} />
              <span className="text-sm">{article.date}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/60">
              <Clock size={16} />
              <span className="text-sm">{article.readTime}</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink to-lavender rounded-full flex items-center justify-center text-white font-bold">
                {article.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-foreground">{article.author}</p>
                <p className="text-sm text-foreground/60">{article.authorTitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={18} className="text-foreground/60" />
              </motion.button>
              <motion.button
                className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bookmark size={18} className="text-foreground/60" />
              </motion.button>
              <motion.button
                className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={18} className="text-foreground/60" />
              </motion.button>
            </div>
          </div>
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

// Article Content
function ArticleContent({ article }: { article: any }) {
  return (
    <motion.article
      className="py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          {/* Featured Image */}
          <motion.div
            className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 rounded-2xl mb-12 flex items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-8xl opacity-50">🎨</div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm opacity-80">Featured Image</p>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl text-foreground/80 leading-relaxed mb-6">
              {article.intro}
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            className="glass rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gradient mb-6">Table of Contents</h3>
            <ul className="space-y-3">
              {article.toc.map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink to-lavender rounded-full" />
                  <a href={`#section-${index + 1}`} className="text-foreground/70 hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Main Content Sections */}
          {article.sections.map((section: any, index: number) => (
            <motion.section
              key={index}
              id={`section-${index + 1}`}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 * index }}
            >
              <h2 className="text-3xl font-bold text-gradient mb-6">{section.title}</h2>
              
              {section.content.map((paragraph: string, pIndex: number) => (
                <p key={pIndex} className="text-foreground/80 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}

              {section.image && (
                <motion.div
                  className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl opacity-50">{section.image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
                </motion.div>
              )}

              {section.video && (
                <motion.div
                  className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl opacity-50">{section.video}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </motion.div>
              )}

              {section.code && (
                <motion.div
                  className="glass rounded-2xl p-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code size={20} className="text-pink" />
                    <span className="text-sm font-medium text-foreground/60">Code Example</span>
                  </div>
                  <pre className="text-sm text-foreground/80 overflow-x-auto">
                    <code>{section.code}</code>
                  </pre>
                </motion.div>
              )}

              {section.quote && (
                <motion.div
                  className="border-l-4 border-gradient-to-b from-pink to-lavender pl-8 py-6 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Quote size={32} className="text-pink/50 mb-4" />
                  <blockquote className="text-xl text-foreground/80 italic leading-relaxed">
                    "{section.quote}"
                  </blockquote>
                  <cite className="text-sm text-foreground/60 mt-4 block">— {section.quoteAuthor}</cite>
                </motion.div>
              )}
            </motion.section>
          ))}

          {/* Key Takeaways */}
          <motion.div
            className="glass rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gradient mb-6">Key Takeaways</h3>
            <ul className="space-y-4">
              {article.takeaways.map((takeaway: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink to-lavender rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap size={12} className="text-white" />
                  </div>
                  <span className="text-foreground/80">{takeaway}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {article.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-pink/10 to-lavender/10 text-foreground text-sm rounded-full border border-pink/20 hover:border-pink/40 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// Related Articles
function RelatedArticles({ articles }: { articles: any[] }) {
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
            Related Articles
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Continue exploring our insights on design, technology, and digital innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video bg-gradient-to-br from-pink/20 to-lavender/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="text-4xl opacity-50">{article.image}</div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-pink/20 to-lavender/20 text-foreground text-sm rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center gap-2 text-foreground/60">
                  <Calendar size={14} />
                  <span className="text-sm">{article.date}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gradient mb-3 group-hover:underline transition-all duration-300">
                {article.title}
              </h3>
              
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink to-lavender rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {article.author.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <span className="text-sm text-foreground/60">{article.author}</span>
                </div>
                <ArrowLeft size={16} className="text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </motion.article>
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

// Sample article data
const sampleArticle = {
  title: "The Future of Design Systems in the AI Era",
  excerpt: "As artificial intelligence becomes more integrated into our design workflows, we're witnessing a fundamental shift in how design systems are conceived, maintained, and evolved.",
  category: "Design Systems",
  date: "Dec 15, 2024",
  readTime: "8 min read",
  author: "Alex Bennett",
  authorTitle: "Lead Designer",
  intro: "The landscape of digital design is undergoing a revolutionary transformation. Artificial intelligence is no longer just a buzzword—it's becoming an integral part of how we create, iterate, and maintain design systems that scale across organizations and platforms.",
  toc: [
    "The Current State of Design Systems",
    "AI-Powered Design Generation",
    "Automated Component Creation",
    "Intelligent Design Tokens",
    "Predictive Design Patterns",
    "The Human-AI Collaboration",
    "Future Implications"
  ],
  sections: [
    {
      title: "The Current State of Design Systems",
      content: [
        "Traditional design systems have served us well, providing consistency and scalability across digital products. However, they often require significant manual maintenance and can become outdated quickly as design trends evolve.",
        "The challenge lies not just in creating these systems, but in keeping them relevant and useful as teams grow, products evolve, and user expectations change. This is where AI steps in as a game-changing force."
      ],
      image: "🎨"
    },
    {
      title: "AI-Powered Design Generation",
      content: [
        "Imagine a world where your design system can automatically generate new components based on usage patterns, user feedback, and emerging design trends. This isn't science fiction—it's happening now.",
        "AI can analyze thousands of design patterns, understand context, and suggest new components that fit seamlessly into your existing system. It can identify gaps in your design language and propose solutions that maintain consistency while pushing creative boundaries."
      ],
      video: "🤖"
    },
    {
      title: "Automated Component Creation",
      content: [
        "One of the most exciting developments is the ability to generate entire component libraries from simple descriptions. Tell the AI what you need, and it can create not just the visual design, but also the code, documentation, and usage guidelines.",
        "This dramatically reduces the time from concept to implementation, allowing designers to focus on higher-level strategy and user experience rather than getting bogged down in implementation details."
      ],
      code: `// AI-Generated Component Example
const Button = ({ variant, size, children, ...props }) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-200";
  const variants = {
    primary: "bg-gradient-to-r from-pink to-lavender text-white hover:shadow-glow",
    secondary: "bg-foreground/5 text-foreground hover:bg-foreground/10",
    ghost: "text-foreground/60 hover:text-foreground"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};`
    },
    {
      title: "Intelligent Design Tokens",
      content: [
        "Design tokens are evolving from static values to dynamic, context-aware variables. AI can analyze usage patterns and automatically adjust token values based on performance metrics, accessibility requirements, and user preferences.",
        "This means your color palette can automatically adapt to different cultural contexts, your spacing can optimize for different screen sizes, and your typography can adjust for readability across different languages and user abilities."
      ],
      quote: "The future of design systems isn't just about consistency—it's about intelligence that adapts to context while maintaining coherence.",
      quoteAuthor: "Sarah Chen, Design Systems Lead at Figma"
    },
    {
      title: "Predictive Design Patterns",
      content: [
        "AI can predict which design patterns will be most effective for specific use cases, user segments, and business goals. By analyzing vast amounts of user interaction data, AI can suggest design decisions that are likely to improve conversion rates, user satisfaction, and business outcomes.",
        "This predictive capability extends beyond individual components to entire user flows, helping teams make data-driven design decisions that are both creative and effective."
      ],
      image: "📊"
    },
    {
      title: "The Human-AI Collaboration",
      content: [
        "The most successful implementations of AI in design systems aren't about replacing human creativity—they're about augmenting it. AI handles the repetitive, analytical work, freeing designers to focus on strategy, user empathy, and creative problem-solving.",
        "This collaboration creates a powerful synergy where human intuition and creativity combine with AI's analytical capabilities to produce design systems that are both innovative and practical."
      ]
    },
    {
      title: "Future Implications",
      content: [
        "As AI becomes more sophisticated, we can expect design systems to become more adaptive, more intelligent, and more valuable to organizations. The designers who embrace this technology will find themselves at the forefront of a new era in digital design.",
        "The question isn't whether AI will transform design systems—it's how quickly we can adapt to this new reality and leverage it to create better experiences for users and more efficient workflows for teams."
      ]
    }
  ],
  takeaways: [
    "AI is transforming design systems from static libraries to dynamic, intelligent systems",
    "Automated component generation reduces time from concept to implementation",
    "Intelligent design tokens can adapt to context and user needs automatically",
    "Human-AI collaboration amplifies creativity rather than replacing it",
    "The future belongs to designers who embrace AI as a creative partner"
  ],
  tags: ["AI", "Design Systems", "Automation", "Future of Design", "UX", "Technology"]
};

const relatedArticles = [
  {
    title: "Building for Performance: Why Speed Matters",
    excerpt: "Performance isn't just a technical metric—it's a fundamental aspect of user experience.",
    category: "Performance",
    date: "Dec 10, 2024",
    author: "Sarah Chen",
    image: "⚡"
  },
  {
    title: "The Art of Digital Minimalism",
    excerpt: "In an age of digital noise, the most powerful designs are often the simplest.",
    category: "Design",
    date: "Dec 5, 2024",
    author: "Marcus Rodriguez",
    image: "🎯"
  },
  {
    title: "AI-Powered Design: The New Frontier",
    excerpt: "Exploring how artificial intelligence is revolutionizing the creative process.",
    category: "AI",
    date: "Nov 28, 2024",
    author: "Emma Thompson",
    image: "🤖"
  }
];

// Main Article Page
export default function ArticlePage({ params }: { params: { slug: string } }) {
  // For now, we'll use the sample article, but this could be dynamic based on params.slug
  const article = sampleArticle;
  
  return (
    <div className="relative">
      <Navbar />
      
      {/* Back Button */}
      <motion.div
        className="fixed top-24 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/blogs"
          className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/10 rounded-full text-foreground/80 hover:text-foreground transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>
      </motion.div>

      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <RelatedArticles articles={relatedArticles} />
      <Footer />
    </div>
  );
}
