import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPosts } from '@/lib/posts';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';

type Props = {
    source: MDXRemoteSerializeResult;
    frontMatter: any;
};

export default function Post({ source, frontMatter }: Props) {
    return (
        <>
            <Head>
                <title>{frontMatter.title} | DeepThought</title>
                <meta name="description" content={frontMatter.description} />
            </Head>
            <article className="prose mx-auto px-4">
                <h1>{frontMatter.title}</h1>
                <MDXRemote {...source} />
            </article>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: getAllPosts().map(({ slug }) => ({ params: { slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const mdxPath = path.join(process.cwd(), 'content/posts', slug + '.mdx');
    const source = fs.readFileSync(mdxPath, 'utf8');
    const { content, data } = matter(source);
    const mdxSource = await serialize(content, { scope: data });
    return { props: { source: mdxSource, frontMatter: data } };
};
