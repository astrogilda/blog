/**
 * next.config.mjs
 * Standard configuration for Next.js with the MDX plugin.
 */
import mdx from '@next/mdx';

const withMDX = mdx({
    extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* ---------- GENERAL ---------- */
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    reactStrictMode: true,

    /* ---------- BUILDS ---------- */
    // NOTE: This should be set to `false` for production builds to enforce code quality.
    eslint: {
        ignoreDuringBuilds: true
    },
};

export default withMDX(nextConfig);
