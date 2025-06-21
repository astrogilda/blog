import Head from 'next/head';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import Pre from '@/components/Pre';
import ThemeToggle from '@/components/ThemeToggle';
import ArticleLayout from '@/components/ArticleLayout';
import dynamic from 'next/dynamic'; // Import dynamic
import { useRef } from 'react'; // Import useRef

// Dynamically import TableOfContents (client-side only)
const TableOfContents = dynamic(() => import('@/components/TableOfContents'), { ssr: false });

interface FrontMatter {
    title: string;
    description?: string;
    date?: string;
    tags?: string[];
}

interface PostProps {
    frontMatter: FrontMatter;
    mdxSource: MDXRemoteSerializeResult;
}

const components = {
    pre: Pre as (props: any) => React.ReactElement,
};

export default function PostPage({ frontMatter, mdxSource }: PostProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Head>
                <title>{frontMatter.title}</title>
                <meta name="description" content={frontMatter.description} />
            </Head>

            <ArticleLayout
                title={frontMatter.title}
                date={frontMatter.date!}
                tags={frontMatter.tags || []}
            >
                <div className="flex justify-between items-center mb-4">
                    <ThemeToggle />
                    {/* Add Table of Contents dynamically (client-side only) */}
                    <TableOfContents content={contentRef} />
                </div>
                {/* Render MDX content */}
                <div ref={contentRef}>
                    <MDXRemote {...mdxSource} components={components} />
                </div>
            </ArticleLayout>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const files = await fs.readdir(postsDir);
    const paths = files
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => ({ params: { slug: f.replace(/\.mdx$/, '') } }));
    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const slug = params!.slug as string;
    const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf-8');

    const { data: fmRaw, content } = matter(fileContents);
    const frontMatter: FrontMatter = {
        title: String(fmRaw.title),
        description: fmRaw.description ? String(fmRaw.description) : undefined,
        date: fmRaw.date ? String(fmRaw.date) : undefined,
        tags: Array.isArray(fmRaw.tags) ? fmRaw.tags.map((t) => String(t)) : [],
    };

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypePrism as any],
        },
    });

    return {
        props: {
            frontMatter,
            mdxSource,
        },
    };
};
