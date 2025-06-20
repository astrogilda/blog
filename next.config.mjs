import mdx from '@next/mdx';

const withMDX = mdx({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ⬇️ skip eslint in CI / FastComet builds
    eslint: { ignoreDuringBuilds: true },

    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
