var mavi = {}
// fetch('https://raw.githubusercontent.com/mavi-server/mavi/main/package.json').then(res => {
//     mavi = res.json()
// })

export default {
    lang: 'en-US',
    title: 'Mavi',
    head: [
        [
            "link", { href: "/style.css", rel: "stylesheet", type: "text/css" }
        ]
    ],
    description: 'Create a server without coding',
    lastUpdated: true,
    themeConfig: {
        logo: '/mavi.svg',
        siteTitle: false,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/mavi-server/mavi' }
        ],
        nav: [
            // { text: 'Guide', link: '/guide/what-is-vitepress', activeMatch: '/guide/' },
            { text: 'Configs', link: '/config/introduction', activeMatch: '/config/' },
            {
                text: mavi.version,
                items: [
                    {
                        text: 'Changelog',
                        link: 'https://github.com/mavi-server/mavi/releases'
                    },
                    {
                        text: 'Contributing',
                        link: 'https://github.com/mavi-server/mavi'
                    },
                ],
            },
        ],
        sidebar: [
            {
                text: 'Guide',
                collapsible: true,
                items: [
                    { text: 'Introduction', link: '/introduction' },
                    { text: 'Getting Started', link: '/getting-started' },
                    // { text: 'Mavi Config', link: '/mavi-config' },
                ]
            },
            {
                text: 'Directory Structure',
                collapsible: true,
                items: [
                    { text: 'Database', link: '/directory/database' },
                    { text: 'Models', link: '/directory/models' },
                    { text: 'Controllers', link: '/directory/controllers' },
                    { text: 'Routes', link: '/directory/routes' },
                    { text: 'Populate', link: '/directory/populate' },
                    { text: 'Middlewares', link: '/directory/middlewares' },
                    { text: 'Utils', link: '/directory/utils' },
                ]
            },
            {
                text: "Api settings",
                collapsible: true,
                items: [
                    {
                        text: "Queries", link: "/settings/queries"
                    }
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present M. Emre Yalcin'
        },

        // algolia: {
        //     appId: '8J64VVRP8K',
        //     apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        //     indexName: 'vitepress'
        // },
    },
}