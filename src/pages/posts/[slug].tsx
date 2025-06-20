// src/pages/posts/[slug].tsx

import fs from 'node:fs/promises';
import path from 'node:path';
import Head from 'next/head';
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc';  // ✅ both v5 APIs

// ✂︎  —— we no longer need gray-matter ————
interface FrontMatter {
    title: string;
    description: string;
    date: string;
    tags?: string[];
}

interface PostProps {
    frontMatter: FrontMatter;
    compiledSource: string;          // string returned by compileMDX
}

export default function PostPage({ frontMatter, compiledSource }: PostProps) {
    return (
        <>
            <Head>
                <title>{frontMatter.title}</title>
                <meta name="description" content={frontMatter.description} />
            </Head>

            <article className="prose mx-auto px-4">
                <h1>{frontMatter.title}</h1>
                {/* v5: MDXRemote takes the *compiled* string only */}
                <MDXRemote source={compiledSource} />
            </article>
        </>
    );
}

/* ---------- Static generation ---------- */

const postsDir = path.join(process.cwd(), 'content');

export async function getStaticPaths() {
    const files = await fs.readdir(postsDir);
    const paths = files
        .filter(f => f.endsWith('.mdx'))
        .map(f => ({ params: { slug: f.replace(/\.mdx$/, '') } }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const slug = params.slug as string;
    const raw = await fs.readFile(path.join(postsDir, `${slug}.mdx`), 'utf8');

    // v5 magic – parses front-matter **and** compiles MDX in one call
    const { content: compiledSource, frontmatter } = await compileMDX<FrontMatter>({
        source: raw,
        options: { parseFrontmatter: true },
    });

    return {
        props: {
            compiledSource: String(compiledSource),
            frontMatter: frontmatter,
        },
    };
}
