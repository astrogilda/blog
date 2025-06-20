import type { ReactNode } from "react";

export default function ArticleLayout({
    title,
    date,
    tags,
    children
}: {
    title: string;
    date: string;
    tags: string[];
    children: ReactNode;
}) {
    return (
        <article className="prose dark:prose-invert mx-auto px-4 py-12">
            <h1>{title}</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </p>

            <ul className="flex flex-wrap gap-2 mb-8">
                {tags.map(t => (
                    <li
                        key={t}
                        className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs font-medium"
                    >
                        #{t}
                    </li>
                ))}
            </ul>

            {children}
        </article>
    );
}
