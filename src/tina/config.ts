import { defineConfig } from 'tinacms';

export default defineConfig({
    branch: 'main',
    clientId: '',          // add later if you opt into Tina Cloud
    token: '',             // idem
    build: { outputFolder: 'admin' },
    media: { tina: {} },
    schema: {
        collections: [{
            name: 'post',
            label: 'Posts',
            path: 'content/posts',
            fields: [
                { type: 'string', name: 'title', label: 'Title' },
                { type: 'string', name: 'description', label: 'Description' },
                { type: 'datetime', name: 'date', label: 'Date' },
                { type: 'string', name: 'tags', label: 'Tags', list: true },
                { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
            ],
        }],
    },
});
