const path = require('path')
const container = require('markdown-it-container')
const pJson = require('../../package.json')

module.exports = {
  dest: './docs/.vuepress/dist',
  base: '/docs/',
  lang: 'zh-CN',
  title: 'DTC',
  description: `前端脚本库(v${pJson.version})`,
  head: [
    ['link', {
      rel: 'icon',
      href: `/logo.png`
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: `/icons/apple-touch-icon-152x152.png`
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#3eaf7c'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]
  ],
  // theme: '@vuepress/vue',
  themeConfig: {
    repo: 'wuyax/docs',
    editLinks: true,
    docsDir: 'docs',
    // #697 Provided by the official algolia team.
    algolia: {
      apiKey: '6f13496eef59ad9753f01df687f7f5eb',
      indexName: 'wuyax'
    },
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: require('./nav/zh'),
    sidebar: {
      '/api/': getApiSidebar('Util','Vis','Dev', 'Voice'),
      '/guide/': getGuideSidebar('指南', '关于文档'),
      // '/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
      // '/theme/': getThemeSidebar('主题', '介绍')
    }
  },
  // 当前版本不支持插件
  /* plugins: [
    ['@vuepress/i18n-ui', false],
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/notification', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }],
  ], */
  clientRootMixin: path.resolve(__dirname, 'mixin.js'),
  extendMarkdown(md) {
    md.use(container, 'upgrade', {
      render: (tokens, idx) => tokens[idx].nesting === 1 ?
        `<UpgradePath title="${tokens[idx].info.trim().slice('upgrade'.length).trim()}">` :
        '</UpgradePath>'
    })
  },
}

function getGuideSidebar(groupA, groupB) {
  return [{
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'contribute'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'documents',
        'specifications',
        'codepen',
        'i18n',
        'deploy'
      ]
    },
  ]
}

function getPluginSidebar(pluginTitle, pluginIntro, officialPluginTitle) {
  return [{
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api'
      ]
    },
    {
      title: officialPluginTitle,
      collapsable: false,
      children: [
        'official/plugin-search',
        'official/plugin-active-header-links',
        'official/plugin-pwa',
        'official/plugin-blog',
        'official/plugin-pagination',
        'official/plugin-google-analytics',
        'official/plugin-i18n-ui',
        'official/plugin-last-updated',
        'official/plugin-medium-zoom',
        'official/plugin-back-to-top',
        'official/plugin-register-components',
      ]
    }
  ]
}

function getThemeSidebar(groupA, introductionA) {
  return [{
    title: groupA,
    collapsable: false,
    children: [
      ['', introductionA],
      'using-a-theme',
      'writing-a-theme',
      'option-api',
      'default-theme-config'
    ]
  }, ]
}

function getApiSidebar(groupA, groupB, groupC, groupD) {
  return [{
    title: groupA,
    collapsable: false,
    children: [
      '',
      'util-object',
      'util-string',
      'util-type-check',
      'util-common',
      'util-storage'
    ]
  },{
    title: groupB,
    collapsable: false,
    children: [
      'vis-map3d'
    ]
  },{
    title: groupC,
    collapsable: false,
    children: [
      'dev-debug'
    ]
  },{
    title: groupD,
    collapsable: false,
    children: [
      'voice'
    ]
  }]
}