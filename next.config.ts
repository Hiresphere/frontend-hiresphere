import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4000/:path*',
            },
            {
                source: '/auth/:path*',
                destination: 'http://localhost/auth/:path*', // NGINX will proxy to auth-service
            },
        ];
    },
};

export default nextConfig;
