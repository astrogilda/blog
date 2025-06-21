import React, { useState, useEffect, useRef } from 'react';

const TableOfContents = ({ content }: { content: React.RefObject<HTMLElement> }) => {
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        const headingElements = content.current?.querySelectorAll('h2, h3');
        const headingData = Array.from(headingElements || []).map((heading, index) => ({
            id: `heading-${index}`,
            text: heading.textContent || '',
        }));

        setHeadings(headingData);
    }, [content]);

    return (
        <div className="table-of-contents">
            {headings.length > 0 && (
                <nav>
                    <ul>
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <a href={`#${heading.id}`}>{heading.text}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default TableOfContents;
