'use client';

import { Instagram } from '@/assets/svgs/Instagram';
import Logo from '@/assets/svgs/Logo';
import { XIcon } from '@/assets/svgs/XIcon';
import FaqAccordion from '@/components/faq-accordion';
import FeatureCard from '@/components/feature-card';
import HeroImage from '@/components/hero-image';
import TestimonialCarousel from '@/components/testimonial-carousel';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const slideUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- Add this

    // Effect to handle scroll for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Get all sections
            const sections = ['features', 'how-it-works', 'pricing', 'faq'];

            // Find which section is currently in view
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // If section is in viewport (with some buffer for better UX)
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (
        e: React.MouseEvent<HTMLButtonElement>,
        sectionId: string,
    ) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            // Get header height (64px - adjust if your header height is different)
            const headerHeight = 64;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar with animation */}
            <motion.header
                className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
                    isScrolled ? 'shadow-md' : ''
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <Logo />
                        </motion.div>
                        <span className="text-xl font-bold text-primary">
                            HireSphere
                        </span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        {['Features', 'How It Works', 'Pricing', 'FAQ'].map(
                            (item) => {
                                const sectionId = item
                                    .toLowerCase()
                                    .replace(/\s+/g, '-');
                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={(
                                            e: React.MouseEvent<HTMLButtonElement>,
                                        ) => scrollToSection(e, sectionId)}
                                        className={`text-sm font-medium relative group 
                                        ${
                                            activeSection === sectionId
                                                ? 'text-primary'
                                                : isScrolled
                                                  ? 'text-primary/60'
                                                  : 'text-muted-foreground'
                                        }`}
                                    >
                                        {item}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                                        ${
                                            activeSection === sectionId
                                                ? 'w-full'
                                                : 'w-0 group-hover:w-full'
                                        }`}
                                        />
                                    </button>
                                );
                            },
                        )}
                    </nav>
                    <div className="flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link href={'/login'}>
                                <Button
                                    variant="outline"
                                    className="hidden md:flex transition-colors hover:bg-blue-50"
                                >
                                    Log in
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button className="transition-colors hover:bg-blue-700">
                                Get Started
                            </Button>
                        </motion.div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
                    <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col">
                        <Button
                            className="self-end mb-8"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                        <nav className="flex flex-col gap-6">
                            {['Features', 'How It Works', 'Pricing', 'FAQ'].map(
                                (item) => {
                                    const sectionId = item
                                        .toLowerCase()
                                        .replace(/\s+/g, '-');
                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={(e) => {
                                                scrollToSection(e, sectionId);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`text-lg font-medium text-left ${
                                                activeSection === sectionId
                                                    ? 'text-primary'
                                                    : 'text-muted-foreground'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    );
                                },
                            )}
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button
                                    variant="outline"
                                    className="w-full mt-6"
                                >
                                    Log in
                                </Button>
                            </Link>
                        </nav>
                    </div>
                    {/* Click outside to close */}
                    <div
                        className="flex-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setIsMobileMenuOpen(false);
                            }
                        }}
                    />
                </div>
            )}

            <main className="flex-1">
                {/* Hero Section with framer-motion */}
                <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-6"
                        >
                            <span className="font-medium">
                                Revolutionizing Job Search
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
                        >
                            Your AI-Powered{' '}
                            <span className="text-primary">
                                Career Accelerator
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="max-w-2xl text-xl text-muted-foreground mb-10"
                        >
                            Automate job applications, ace interviews, and
                            fast-track your career growth with the all-in-one
                            platform designed for the modern job seeker.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 mb-16"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={'/login'}>
                                    <Button size="lg" className="gap-2 group">
                                        Start for Free
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 10,
                                            }}
                                        >
                                            <ArrowRight className="h-4 w-4 transition-transform" />
                                        </motion.div>
                                    </Button>
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="outline">
                                    Watch Demo
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="relative w-full max-w-5xl"
                        >
                            <HeroImage />
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section with counter animations */}
                <section className="border-y bg-blue-50/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {[
                                {
                                    value: '85%',
                                    text: 'Less Time Spent on Applications',
                                },
                                {
                                    value: '3.2x',
                                    text: 'More Interview Invitations',
                                },
                                { value: '10k+', text: 'Active Users' },
                                { value: '92%', text: 'User Satisfaction' },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.value + stat.text}
                                    variants={slideUp}
                                    className="flex flex-col items-center"
                                >
                                    <p className="text-3xl md:text-4xl font-bold text-primary">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground text-center">
                                        {stat.text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                All-in-One Career Platform
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                Everything you need to accelerate your job
                                search and career growth in one place.
                            </motion.p>
                        </motion.div>
                        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: 'job-automation',
                                    title: 'Job Application Automation',
                                    description:
                                        'Automatically apply to matching jobs across multiple platforms with tailored resumes and cover letters.',
                                },
                                {
                                    icon: 'cold-outreach',
                                    title: 'Cold Outreach System',
                                    description:
                                        'Generate personalized messages to recruiters and schedule follow-ups across multiple channels.',
                                },
                                {
                                    icon: 'resume-builder',
                                    title: 'Resume & Cover Letter Builder',
                                    description:
                                        'Create ATS-optimized documents with real-time job description matching and keyword scoring.',
                                },
                                {
                                    icon: 'interview-simulator',
                                    title: 'AI Interview Simulator',
                                    description:
                                        'Practice with voice-enabled mock interviews that provide real-time feedback on your responses.',
                                },
                                {
                                    icon: 'market-insights',
                                    title: 'Market Insights Dashboard',
                                    description:
                                        'Access real-time data on trending skills, hiring activity, and salary ranges in your industry.',
                                },
                                {
                                    icon: 'career-coach',
                                    title: 'Career Coach Assistant',
                                    description:
                                        'Get personalized advice, custom goal plans, and progress tracking from your AI career mentor.',
                                },
                            ].map((feature) => (
                                <FeatureCard
                                    key={feature.title}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 bg-blue-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                How HireSphere Works
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                A simple process to revolutionize your job
                                search experience
                            </motion.p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: 1,
                                    title: 'Create Your Profile',
                                    description:
                                        'Upload your resume, set your preferences, and define your career goals.',
                                },
                                {
                                    step: 2,
                                    title: 'Activate Automation',
                                    description:
                                        'Set up job filters, customize your outreach templates, and enable auto-apply.',
                                },
                                {
                                    step: 3,
                                    title: 'Track & Improve',
                                    description:
                                        'Monitor your applications, practice interviews, and refine your strategy with AI insights.',
                                },
                            ].map((item) => (
                                <motion.div
                                    key={item.title + item.step}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5 },
                                        },
                                    }}
                                    whileHover={{
                                        y: -10,
                                        boxShadow:
                                            '0 10px 25px -5px rgba(59, 130, 246, 0.2)',
                                        transition: { duration: 0.3 },
                                    }}
                                    className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center transition-all duration-300"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                        className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold mb-4"
                                    >
                                        {item.step}
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                What Our Users Say
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                Join thousands of professionals who&apos;ve
                                transformed their job search with HireSphere
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            <TestimonialCarousel />
                        </motion.div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section
                    id="pricing"
                    className="py-20 bg-gradient-to-b from-white to-blue-50"
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        {/* Section Title + Value Proposition */}
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                Flexible Plans for Every Career Stage
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Start free. Upgrade as you grow. Only pay for
                                what you need.
                            </p>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* Free Plan */}
                            <div className="rounded-xl border bg-white p-8 flex flex-col h-full shadow transition-transform hover:-translate-y-2 hover:shadow-lg duration-200">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-1">
                                        Free
                                    </h3>
                                    <span className="inline-block text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded mb-2">
                                        Get started at no cost
                                    </span>
                                    <div className="mb-2">
                                        <span className="text-3xl font-bold">
                                            ₹0
                                        </span>
                                        <span className="text-muted-foreground">
                                            /month
                                        </span>
                                    </div>
                                </div>
                                <ul className="mb-8 flex-1 space-y-3 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Up to 10 job applications/month
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        2 resume/cover letter downloads
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Basic cold outreach tools
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-400">
                                        <X className="h-5 w-5" /> Interview
                                        simulations
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-400">
                                        <X className="h-5 w-5" /> AI feedback &
                                        analytics
                                    </li>
                                </ul>
                                <Button className="w-full" size="lg">
                                    Start Free
                                </Button>
                            </div>

                            {/* Professional Plan */}
                            <div className="rounded-xl border-2 border-primary bg-primary/5 p-8 flex flex-col h-full shadow-lg relative z-10 md:-mt-4 md:mb-4 transition-transform hover:-translate-y-3 hover:shadow-2xl duration-200">
                                <div className="absolute -top-3 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                    Most Popular
                                </div>
                                <div className="mb-4 mt-2">
                                    <h3 className="text-2xl font-bold mb-1">
                                        Professional
                                    </h3>
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="line-through text-gray-400 text-xl">
                                            ₹1499
                                        </span>
                                        <span className="text-4xl font-bold text-primary">
                                            ₹999
                                        </span>
                                        <span className="text-muted-foreground">
                                            /month
                                        </span>
                                    </div>
                                </div>
                                <ul className="mb-8 flex-1 space-y-3 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Unlimited job applications
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Unlimited resume/cover letter downloads
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Advanced cold outreach automation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Interview simulations
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        AI feedback & analytics
                                    </li>
                                </ul>
                                <Button
                                    className="w-full bg-primary text-white hover:bg-primary/90"
                                    size="lg"
                                >
                                    Start Free
                                </Button>
                            </div>

                            {/* Enterprise Plan */}
                            <div className="rounded-xl border bg-white p-8 flex flex-col h-full shadow transition-transform hover:-translate-y-2 hover:shadow-lg duration-200">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-1">
                                        Enterprise
                                    </h3>
                                    <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded mb-2">
                                        For Teams & Career Services
                                    </span>
                                    <div className="mb-2">
                                        <span className="text-3xl font-bold">
                                            Custom Pricing
                                        </span>
                                    </div>
                                </div>
                                <ul className="mb-8 flex-1 space-y-3 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Team management dashboard
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Bulk job applications
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Integrations (ATS, Slack, etc.)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Dedicated support & onboarding
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-primary" />{' '}
                                        Custom analytics & reporting
                                    </li>
                                </ul>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    variant="outline"
                                >
                                    Contact Sales
                                </Button>
                            </div>
                        </div>

                        {/* Feature Comparison Toggle */}
                        <div className="max-w-5xl mx-auto mt-10">
                            <details className="group">
                                <summary className="cursor-pointer text-center text-primary font-semibold mb-4 py-2 hover:underline">
                                    Compare Features
                                </summary>
                                <div className="overflow-x-auto rounded-lg border mt-4 bg-white">
                                    <table className="min-w-full text-sm text-center">
                                        <thead>
                                            <tr className="bg-blue-50">
                                                <th className="py-3 px-4" />
                                                <th className="py-3 px-4 font-bold">
                                                    Free
                                                </th>
                                                <th className="py-3 px-4 font-bold">
                                                    Professional
                                                </th>
                                                <th className="py-3 px-4 font-bold">
                                                    Enterprise
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                {
                                                    label: 'Job Applications',
                                                    free: 'Up to 10/mo',
                                                    pro: 'Unlimited',
                                                    ent: 'Bulk',
                                                },
                                                {
                                                    label: 'Resume Downloads',
                                                    free: '2/mo',
                                                    pro: 'Unlimited',
                                                    ent: 'Unlimited',
                                                },
                                                {
                                                    label: 'Cold Outreach',
                                                    free: 'Basic',
                                                    pro: 'Advanced',
                                                    ent: 'Advanced',
                                                },
                                                {
                                                    label: 'Interview Simulations',
                                                    free: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    pro: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                    ent: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                },
                                                {
                                                    label: 'AI Feedback',
                                                    free: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    pro: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                    ent: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                },
                                                {
                                                    label: 'Team Management',
                                                    free: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    pro: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    ent: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                },
                                                {
                                                    label: 'Integrations',
                                                    free: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    pro: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    ent: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                },
                                                {
                                                    label: 'Dedicated Support',
                                                    free: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    pro: (
                                                        <X className="mx-auto text-gray-300" />
                                                    ),
                                                    ent: (
                                                        <Check className="mx-auto text-primary" />
                                                    ),
                                                },
                                            ].map((row, i) => (
                                                <tr
                                                    key={row.label}
                                                    className={
                                                        i % 2 === 0
                                                            ? 'bg-white'
                                                            : 'bg-blue-50/50'
                                                    }
                                                >
                                                    <td className="py-2 px-4 font-medium text-left">
                                                        {row.label}
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        {row.free}
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        {row.pro}
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        {row.ent}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </details>
                        </div>

                        {/* Credit Add-On Block */}
                        <div className="max-w-5xl mx-auto mt-14">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold mb-1">
                                    Need more power?
                                </h3>
                                <p className="text-muted-foreground">
                                    Buy credit packs to access premium tools
                                    like AI Interview Feedback, Simulations, and
                                    Resume Rewrite.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <div className="flex-1 bg-white rounded-lg border shadow p-6 flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition">
                                    <span className="text-2xl font-bold mb-1">
                                        20 Credits
                                    </span>
                                    <span className="text-primary font-semibold text-lg mb-2">
                                        ₹399
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Ideal for occasional use
                                    </span>
                                </div>
                                <div className="flex-1 bg-white rounded-lg border shadow p-6 flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition">
                                    <span className="text-2xl font-bold mb-1">
                                        50 Credits
                                    </span>
                                    <span className="text-primary font-semibold text-lg mb-2">
                                        ₹899
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        Best value
                                    </span>
                                </div>
                                <div className="flex-1 bg-white rounded-lg border shadow p-6 flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition">
                                    <span className="text-2xl font-bold mb-1">
                                        100 Credits
                                    </span>
                                    <span className="text-primary font-semibold text-lg mb-2">
                                        ₹1499
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        For power users
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                Frequently Asked Questions
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                Find answers to common questions about
                                HireSphere
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="max-w-3xl mx-auto"
                        >
                            <FaqAccordion />
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold mb-6"
                        >
                            Ready to Transform Your Job Search?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl opacity-90 max-w-2xl mx-auto mb-10"
                        >
                            Join thousands of professionals who&apos;ve
                            accelerated their careers with HireSphere.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={'/login'}>
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="gap-2"
                                    >
                                        Get Started for Free
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 10,
                                            }}
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </motion.div>
                                    </Button>
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-transparent border-white hover:bg-white/10"
                                >
                                    Watch Demo
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="col-span-2"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Logo />
                                    <span className="text-xl font-bold text-primary">
                                        HireSphere
                                    </span>
                                </div>
                                <p className="text-muted-foreground mb-4 max-w-xs">
                                    The all-in-one automated job application and
                                    career acceleration platform.
                                </p>
                                <div className="flex gap-4">
                                    {/* <motion.a
                                        whileHover={{ y: -3, color: '#0077B5' }}
                                        href="https://www.linkedin.com/in/anshumohan-acharya-b95628238/"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Image
                                            src={Linkedin}
                                            width={32}
                                            height={32}
                                            alt="Linkedin"
                                        />
                                    </motion.a> */}
                                    <motion.a
                                        whileHover={{ y: -3, color: '#1DA1F2' }}
                                        href="https://x.com/Anshumohan6139"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <XIcon />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ y: -3, color: '#E4405F' }}
                                        href="https://www.instagram.com/itz_anshumohan/"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Instagram />
                                    </motion.a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h3 className="font-medium mb-4">Product</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#features"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Features
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#pricing"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Pricing
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#integrations"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Integrations
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#changelog"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Changelog
                                        </motion.a>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="font-medium mb-4">Resources</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#blog"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Blog
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#career-tips"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Career Tips
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#guides"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Interview Guides
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#templates"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Resume Templates
                                        </motion.a>
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h3 className="font-medium mb-4">Company</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#about"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            About
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="careers"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Careers
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#contact"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Contact
                                        </motion.a>
                                    </li>
                                    <li>
                                        <motion.a
                                            whileHover={{ x: 3 }}
                                            href="#privacy-policy"
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            Privacy Policy
                                        </motion.a>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
                        >
                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} HireSphere. All
                                rights reserved.
                            </p>
                            <div className="flex gap-6 mt-4 md:mt-0">
                                <motion.a
                                    whileHover={{ y: -2 }}
                                    href="#terms"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Terms
                                </motion.a>
                                <motion.a
                                    whileHover={{ y: -2 }}
                                    href="#privacy"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Privacy
                                </motion.a>
                                <motion.a
                                    whileHover={{ y: -2 }}
                                    href="#cookies"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Cookies
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
