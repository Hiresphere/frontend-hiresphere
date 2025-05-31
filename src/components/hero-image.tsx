'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroImage() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div
            className={`relative rounded-xl border shadow-2xl transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <Image
                src="/placeholder.svg?height=720&width=1280"
                width={1280}
                height={720}
                alt="HireSphere Dashboard"
                className="rounded-xl"
                priority
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
}
