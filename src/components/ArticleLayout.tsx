import type { ReactNode } from "react"
import Link from "next/link"

export default function ArticleLayout({
    title,
    date,
    tags,
    children
}: {
    title: string
    date: string
    tags: string[]
    children: ReactNode
}) {
    return (
        <article className="prose prose-lg dark:prose-invert mx-auto max-w-full sm:max-w-3xl px-4 py-12">
            <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="sm:mr-8">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </time>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-x-4 gap-y-2">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${tag}`}
                            className="no-underline rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800 transition-colors hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-900"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            </header>
            {children}
        </article>
    )
}
