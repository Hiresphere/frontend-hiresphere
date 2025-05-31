'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Google } from '@/assets/svgs/Google';
import { Github } from '@/assets/svgs/Github';

export default function SocialAuth() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        // Implement Google login logic here
        setTimeout(() => setIsLoading(false), 1000); // Simulating API call
    };

    const handleGithubLogin = async () => {
        setIsLoading(true);
        // Implement GitHub login logic here
        setTimeout(() => setIsLoading(false), 1000); // Simulating API call
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant="outline"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2"
            >
                <Google />
                Google
            </Button>
            <Button
                variant="outline"
                disabled={isLoading}
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-2"
            >
                <Github />
                GitHub
            </Button>
        </div>
    );
}
