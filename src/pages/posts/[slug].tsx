import fs from "node:fs/promises";
import path from "node:path";
import Head from "next/head";
import { type GetStaticPaths, type GetStaticProps } from "next";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypePrism from "rehype-prism-plus";
import matter from "gray-matter";

/* ---------- front-matter ---------- */

interface FrontMatter {
    title: string;
    description: string;
    date: string;           // ISO string
    tags?: string[];
}

interface PostProps {
    mdxSource: MDXRemoteSerializeResult;
    frontMatter: FrontMatter;
}

/* ---------- page component ---------- */

export default function PostPage({ mdxSource, frontMatter }: PostProps) {
    const pretty = new Date(frontMatter.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <>
            <Head>
                <title>{frontMatter.title}</title>
                <meta name="description" content={frontMatter.description} />
            </Head>

            <article className="prose prose-lg dark:prose-invert mx-auto px-4">
                <h1 className="!mt-0">{frontMatter.title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pretty}</p>

                {frontMatter.tags?.length && (
                    <ul className="flex flex-wrap gap-2 my-4">
                        {frontMatter.tags.map(t => (
                            <li
                                key={t}
                                className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs tracking-wide"
                            >
                                #{t}
                            </li>
                        ))}
                    </ul>
                )}

                {/* hydrated MDX */}
                <MDXRemote {...mdxSource} />
            </article>
        </>
    );
}

/* ---------- static generation ---------- */

const postsDir = path.join(process.cwd(), "content/posts");

export const getStaticPaths: GetStaticPaths = async () => {
    const files = await fs.readdir(postsDir);
    return {
        paths: files
            .filter(f => /\.(md|mdx)$/.test(f))
            .map(f => ({ params: { slug: f.replace(/\.(md|mdx)$/, "") } })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const raw = await fs.readFile(
        path.join(postsDir, `${params!.slug}.mdx`),
        "utf8"
    );

    const { content, data } = matter(raw) as {
        content: string;
        data: FrontMatter & { date: string | Date };
    };

    /** Make sure `date` is a plain string */
    const fm: FrontMatter = {
        ...data,
        date: typeof data.date === "string" ? data.date : data.date.toISOString()
    };

    const mdxSource = await serialize(content, {
        parseFrontmatter: false,
        mdxOptions: { rehypePlugins: [rehypePrism] }
    });

    return { props: { mdxSource, frontMatter: fm } };
};
