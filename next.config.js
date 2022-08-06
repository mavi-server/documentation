const withNextra = require('nextra')({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
})
module.exports = withNextra()