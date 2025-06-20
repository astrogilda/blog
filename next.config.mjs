/** next.config.mjs  – drop-in replacement
 *  • MDX support (via @next/mdx)
 *  • Turbopack-friendly  (no deprecated options)
 *  • Builds skip ESLint in CI
 */

import mdx from '@next/mdx';

const withMDX = mdx({
    // recognise “.md” & “.mdx” files
    extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* ---------- general ---------- */
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

    /* skip lint step in vercel/FastComet builds */
    eslint: { ignoreDuringBuilds: true },

    /* ---------- Turbopack helpers (optional) ----------
       Ensures MDX is handled when you run `next dev --turbo`.
       Harmless in classic-webpack mode. */
    experimental: {
        turbo: {
            loaders: { '.mdx': '@mdx-js/loader' },
        },
    },
};

export default withMDX(nextConfig);
