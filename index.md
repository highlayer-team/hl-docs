---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Highlayer."
  text: "The full guide"
  image:
   src: /logo.svg
   alt: Highlayer
  tagline: Learn how to build your first dApp with highlayer, setup highlayer node, basics of blockchain, and more.
  actions:
    - theme: brand
      text: Getting started
      link: /guide/getting-started
    - theme: alt
      text: API Examples
      link: /general-documentation/http-api

features:
  - title: Fast
    details: Highlayer is built with speed in mind, interactions with your smart contracts are executed immediately, allowing for atat-of-art UX.
  - title: Cheap
    details: Transactions/interactions on highlayer are cheap, sub-cents, and paid by your users, allowing you to focus on shipping new features rather than worrying about costs.
  - title: Easy
    details: JavaScript is the language of the web, and also the language of highlayer, so developing fully-fledged decentralized apps on highlayer is as easy as to develop usual web app.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #ab3915 30%, #db5e37);

  --vp-home-hero-image-background-image: linear-gradient(#ab3915, #ab3915);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>