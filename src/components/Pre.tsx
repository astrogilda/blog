// // src/components/Pre.tsx
// import React, { useState, useRef, ReactNode } from 'react'
// import { Copy } from 'lucide-react'

// /**
//  * Props for the Pre component.
//  *
//  * @param children   The MDX-generated code block (<code>…</code> tree).
//  * @param className  Any Prism/MDX class (e.g. 'language-python').
//  */
// interface PreProps {
//     children: ReactNode
//     className?: string
// }

// /**
//  * <Pre>
//  *
//  * Wraps a fenced code block, preserves all original markup/indentation,
//  * and injects a copy-to-clipboard button on hover.
//  */
// const Pre: React.FC<PreProps> = ({ children, className }) => {
//     const [copied, setCopied] = useState(false)
//     // 🔑 Ensure the ref matches the <pre> element type
//     const preRef = useRef<HTMLPreElement>(null)

//     /**
//      * copyToClipboard
//      *
//      * Grabs the innerText of the <pre> and writes it to the clipboard.
//      * Shows “Copied!” feedback for 2 seconds.
//      */
//     const copyToClipboard = async () => {
//         try {
//             const text = preRef.current?.innerText ?? ''
//             if (!text) return

//             await navigator.clipboard.writeText(text)
//             setCopied(true)
//             setTimeout(() => setCopied(false), 2000)
//         } catch (err) {
//             console.error('Copy failed:', err)
//         }
//     }

//     return (
//         <div className="relative group my-6">
//             {/* Copy button, visible only on hover */}
//             <button
//                 onClick={copyToClipboard}
//                 aria-label="Copy code"
//                 className="
//           absolute top-2 right-2 z-10 flex items-center gap-1
//           rounded bg-black/50 px-2 py-1 text-xs text-white opacity-0
//           transition-opacity duration-200
//           group-hover:opacity-100
//         "
//             >
//                 <Copy size={12} />
//                 {copied ? 'Copied!' : 'Copy'}
//             </button>

//             {/* 
//         Attach our ref here so TS knows it's an HTMLPreElement.
//         `{children}` preserves the original <code>…</code> structure.
//       */}
//             <pre ref={preRef} className={className}>
//                 {children}
//             </pre>
//         </div>
//     )
// }

// export default Pre


import React, { useState, useRef, ReactNode } from 'react'
import { Copy } from 'lucide-react'

interface PreProps {
    children: ReactNode
    className?: string
}

const Pre: React.FC<PreProps> = ({ children, className }) => {
    const [copied, setCopied] = useState(false)
    const preRef = useRef<HTMLPreElement>(null)

    const copyToClipboard = async () => {
        try {
            const text = preRef.current?.innerText ?? ''
            if (!text) return

            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Copy failed:', err)
        }
    }

    return (
        <div className="relative group my-6">
            <button
                onClick={copyToClipboard}
                aria-label="Copy code"
                className="
                absolute top-2 right-2 z-10 flex items-center gap-1
                rounded bg-black/50 px-2 py-1 text-xs text-white opacity-0
                transition-opacity duration-200
                group-hover:opacity-100
            "
            >
                <Copy size={12} />
                {copied ? 'Copied!' : 'Copy'}
            </button>

            <pre ref={preRef} className={className}>
                {children}
            </pre>
        </div>
    )
}

export default Pre
