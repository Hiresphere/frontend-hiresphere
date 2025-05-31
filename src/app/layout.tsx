import type { Metadata } from 'next';
import {
    Inter,
    JetBrains_Mono,
    Roboto,
} from 'next/font/google';
import './globals.css';
export const metadata: Metadata = {
    title: 'HireSphere',
    description:
        'HireSphere is an all-in-one automated job application and career acceleration platform designed to simplify the job hunt process. It automates job applications and cold outreach, simulates interviews using voice, builds ATS-optimized resumes, and provides valuable career insights—all in one place.',
};

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-jetbrainsMono',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${roboto.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <body className="font-jetBrainsMono">{children}</body>
        </html>
    );
}
