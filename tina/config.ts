// import { defineConfig } from 'tinacms'

// const branch =
//     process.env.GITHUB_BRANCH ||
//     process.env.VERCEL_GIT_COMMIT_REF ||
//     process.env.HEAD ||
//     'main'

// export default defineConfig({
//     branch,
//     clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
//     token: process.env.TINA_TOKEN,

//     build: {
//         publicFolder: 'public',
//         outputFolder: 'admin',
//     },

//     media: {
//         tina: {
//             publicFolder: 'public',
//             mediaRoot: 'uploads',
//         },
//     },

//     schema: {
//         collections: [
//             {
//                 /** Blog-post collection */
//                 name: 'post',
//                 label: 'Posts',
//                 path: 'content/posts', // folder with your .mdx files
//                 format: 'mdx',         // MDX format → body comes back as string
//                 fields: [
//                     { name: 'title', label: 'Title', type: 'string', isTitle: true, required: true },
//                     { name: 'description', label: 'Description', type: 'string' },
//                     { name: 'date', label: 'Date', type: 'datetime' },
//                     { name: 'tags', label: 'Tags', type: 'string', list: true },
//                     {
//                         name: 'body',
//                         label: 'Body',
//                         type: 'string',      // keep raw MDX as plain text
//                         isBody: true,
//                         ui: { component: 'textarea' }, // nicer editing box
//                     },
//                 ],
//             },
//         ],
//     },
// })


// tina/config.ts
import { defineConfig } from 'tinacms'

const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    'main'

export default defineConfig({
    branch,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: process.env.TINA_TOKEN,

    build: {
        publicFolder: 'public',
        outputFolder: 'admin',
    },

    media: {
        tina: {
            publicFolder: 'public',
            mediaRoot: 'uploads',
        },
    },

    schema: {
        collections: [
            {
                name: 'post',
                label: 'Posts',
                path: 'content/posts',
                format: 'mdx',
                fields: [
                    { name: 'title', label: 'Title', type: 'string', isTitle: true, required: true },
                    { name: 'description', label: 'Description', type: 'string' },
                    { name: 'date', label: 'Date', type: 'datetime' },
                    { name: 'tags', label: 'Tags', type: 'string', list: true },
                    {
                        name: 'body',        // ← single raw-MDX field
                        label: 'Body',
                        type: 'string',
                        isBody: true,
                        ui: { component: 'textarea' },
                    },
                ],
            },
        ],
    },
})
