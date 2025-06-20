// src/tina/config.ts
import { defineConfig } from "tinacms";

export default defineConfig({
    clientId: "",
    token: "",
    build: { publicFolder: "public", outputFolder: "admin" },

    media: {                       // keep your uploads settings
        tina: { publicFolder: "public", mediaRoot: "uploads" },
    },

    schema: {
        collections: [
            {
                name: "post",
                label: "Posts",
                path: "content/posts",          // <-- point to the folder that holds *.mdx
                format: "mdx",

                /*  ui.router tells Tina how to build the preview URL  */
                ui: {
                    router: ({ document }) => `/posts/${document._sys.filename}`,
                },

                /*  isTitle & isBody power the sidebar form + live preview  */
                fields: [
                    { name: "title", label: "Title", type: "string", isTitle: true },
                    { name: "description", type: "string" },
                    { name: "date", type: "datetime" },
                    { name: "tags", type: "string", list: true },
                    { name: "body", label: "Body (MDX)", type: "rich-text", isBody: true },
                ],
            },
        ],
    },
});
