import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export type PostMeta = {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
};

export function getAllPosts(): PostMeta[] {
    return fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.mdx'))
        .map(file => {
            const slug = file.replace(/\.mdx$/, '');
            const { data } = matter(
                fs.readFileSync(path.join(POSTS_DIR, file), 'utf8'),
            );
            return { slug, ...data } as PostMeta;
        })
        .sort((a, b) => b.date.localeCompare(a.date));
}
