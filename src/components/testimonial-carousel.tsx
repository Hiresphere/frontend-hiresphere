'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Software Engineer',
        company: 'Tech Innovations',
        image: '/placeholder.svg?height=80&width=80',
        content:
            'HireSphere completely transformed my job search. I went from spending hours on applications to having the system work for me. Within 3 weeks, I had 5 interview offers from top companies.',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Marketing Manager',
        company: 'Global Brands',
        image: '/placeholder.svg?height=80&width=80',
        content:
            'The interview simulator was a game-changer for me. After practicing with it for a week, I felt so much more confident in my real interviews. I credit HireSphere for helping me land my dream job.',
        rating: 5,
    },
    {
        name: 'Priya Patel',
        role: 'Data Analyst',
        company: 'Analytics Pro',
        image: '/placeholder.svg?height=80&width=80',
        content:
            'As someone who struggled with networking, the cold outreach system was invaluable. It helped me connect with industry professionals in a personalized way that got responses. Worth every penny!',
        rating: 4,
    },
    {
        name: 'James Wilson',
        role: 'Product Manager',
        company: 'Future Products',
        image: '/placeholder.svg?height=80&width=80',
        content:
            'The market insights dashboard gave me the competitive edge I needed. I could see exactly which skills were in demand and tailor my resume accordingly. HireSphere is truly an all-in-one solution.',
        rating: 5,
    },
];

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoplay]);

    const next = () => {
        setAutoplay(false);
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setAutoplay(false);
        setCurrent(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
    };

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.name}
                            className="w-full flex-shrink-0 px-4"
                        >
                            <Card className="border-border/40 h-full">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                                            <Image
                                                src={
                                                    testimonial.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={testimonial.name}
                                                className="h-full w-full object-cover"
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role},{' '}
                                                {testimonial.company}
                                            </p>
                                            <div className="flex mt-1">
                                                {Array.from({ length: 5 }).map(
                                                    (_, i) => (
                                                        <Star
                                                            key={`star-${testimonial.name}-${i}`}
                                                            className={`h-4 w-4 ${
                                                                i <
                                                                testimonial.rating
                                                                    ? 'text-yellow-400 fill-yellow-400'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground">
                                        &quot;{testimonial.content}&quot;
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-center gap-2 items-center">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="rounded-full"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {testimonials.map((_, index) => (
                    <Button
                        key={`testimonial-indicator-${testimonials[index].name}-${index}`}
                        variant="ghost"
                        size="sm"
                        className={`h-2 min-w-8 rounded-full p-0 ${
                            current === index ? 'bg-primary' : 'bg-primary/20'
                        }`}
                        onClick={() => {
                            setAutoplay(false);
                            setCurrent(index);
                        }}
                    >
                        <span className="sr-only">Go to slide {index + 1}</span>
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="rounded-full"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
