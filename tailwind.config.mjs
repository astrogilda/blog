/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
        "./content/**/*.{md,mdx}"
    ],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        maxWidth: "75ch",
                        color: theme("colors.gray.800"),
                        a: { color: theme("colors.blue.600"), fontWeight: "500" },
                        code: {
                            backgroundColor: theme("colors.gray.100"),
                            padding: "0.15rem 0.3rem",
                            borderRadius: "0.25rem",
                            fontSize: "0.85em"
                        },
                        "code::before": { content: "''" },
                        "code::after": { content: "''" }
                    }
                },
                invert: {
                    css: {
                        color: theme("colors.gray.100"),
                        a: { color: theme("colors.sky.400") },
                        code: { backgroundColor: theme("colors.gray.800") }
                    }
                }
            })
        }
    },
    plugins: [require("@tailwindcss/typography")]
};
  