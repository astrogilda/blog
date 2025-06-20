import { defineConfig } from "tinacms";

export default defineConfig({
    clientId: "",                           // set later if you use Tina Cloud
    token: "",                              // idem
    build: {
        publicFolder: "public",               // ✅ added
        outputFolder: "admin"
    },

    /* optional, but keeps Tina’s uploads in /public/uploads */
    media: {
        tina: {
            publicFolder: "public",
            mediaRoot: "uploads"
        }
    },

    schema: {
        collections: [
            {
                name: "post",
                label: "Posts",
                path: "content",
                format: "mdx",
                fields: [
                    { name: "title", type: "string" },
                    { name: "description", type: "string" },
                    { name: "date", type: "datetime" },
                    { name: "tags", type: "string", list: true },
                    { name: "body", label: "Body (MDX)", type: "rich-text" }
                ]
            }
        ]
    }
});
