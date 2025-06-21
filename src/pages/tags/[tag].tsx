import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import Head from 'next/head';
import matter from 'gray-matter';
import { type GetStaticProps, type GetStaticPaths } from 'next';

/* ---------- Types ---------- */
// This type defines the essential data for a post list.
interface PostInfo {
    slug: string;
    title: string;
    date: string; // ISO String
    tags: string[];
}

interface TagPageProps {
    tag: string;
    posts: Omit<PostInfo, 'tags'>[]; // The page component only needs slug, title, date
}

const postsDir = path.join(process.cwd(), "content/posts");

/**
 * Helper to get all posts data, now with validation.
 * It will safely skip any markdown files that are missing required frontmatter.
 */
async function getAllPosts(): Promise<PostInfo[]> {
    const files = await fs.readdir(postsDir);
    const posts = await Promise.all(
        files
            .filter(f => /\.(md|mdx)$/.test(f))
            .map(async (f): Promise<PostInfo | null> => {
                const raw = await fs.readFile(path.join(postsDir, f), 'utf8');
                const { data } = matter(raw);

                // Validate that required fields exist to prevent build errors
                if (data.title && data.date) {
                    return {
                        slug: f.replace(/\.(md|mdx)$/, ''),
                        title: data.title,
                        date: new Date(data.date).toISOString(),
                        tags: data.tags || [], // Default to empty array if tags are missing
                    };
                }
                // Return null for invalid posts so they can be filtered out
                console.warn(`Skipping post "${f}" due to missing 'title' or 'date' in frontmatter.`);
                return null;
            })
    );
    // Filter out any null values from invalid files
    return posts.filter((p): p is PostInfo => p !== null);
}

/* ---------- Page Component ---------- */
export default function TagPage({ tag, posts }: TagPageProps) {
    return (
        <>
            <Head>
                <title>Posts tagged with #{tag}</title>
                <meta name="description" content={`A collection of posts tagged with ${tag}`} />
            </Head>
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-8 text-3xl font-bold tracking-tight">
                    Posts tagged with <span className="text-sky-600 dark:text-sky-400">#{tag}</span>
                </h1>
                <ul className="space-y-4">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <li key={post.slug} className="block rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                                <Link href={`/posts/${post.slug}`} className="no-underline">
                                    <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                                        {post.title}
                                    </h2>
                                    <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(post.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No posts found with this tag.</p>
                    )}
                </ul>
            </div>
        </>
    );
}

/* ---------- Static Generation ---------- */
export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getAllPosts();
    // A Set is used to automatically handle duplicate tags
    const tags = new Set(allPosts.flatMap(p => p.tags));

    return {
        paths: Array.from(tags).map(tag => ({ params: { tag: tag as string } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
    const tag = params!.tag as string;
    const allPosts = await getAllPosts();

    const filteredPosts = allPosts
        .filter(p => p.tags.includes(tag))
        // Sort by most recent post first
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
        props: {
            tag,
            // We only pass the necessary data to the component
            posts: filteredPosts.map(({ slug, title, date }) => ({ slug, title, date })),
        },
    };
};
