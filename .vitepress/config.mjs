import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: 'https://docs.highlayer.io'
  },
  lastUpdated: true,
  title: "Highlayer Docs",
  description: "Documentation and guides for developing on highlayer - JavaScript platform for web3 development.",
  appearance:"force-dark",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Highlayer', link: 'https://highlayer.io/' },
      { text: 'Discord community', link: 'https://discord.gg/skTbBz8H6S' },
      { text: 'What is Highlayer', link: '/what-is-highlayer' },
    ],
    search: {
      provider: 'local'
    },
    sidebar: generateSidebar({excludeFilesByFrontmatterFieldName:"exclude", underscoreToSpace:true,capitalizeFirst:true, hyphenToSpace:true, useTitleFromFileHeading:true, }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
