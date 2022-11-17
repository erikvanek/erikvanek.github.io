/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "aero/index.html",
    "revision": "6335aa1423898ec483a6d622b91df303"
  },
  {
    "url": "blog/index.html",
    "revision": "c1b1ea9bcc854737da2d589f5f5ad2d9"
  },
  {
    "url": "book-reviews/deep-work/index.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "books/new-dark-age/index.html",
    "revision": "61880923fe98607ebf1458120d4e17a1"
  },
  {
    "url": "books/teach-like-finland/index.html",
    "revision": "5aff424d28fda6570bcb8ebcf0f95732"
  },
  {
    "url": "books/test/index.html",
    "revision": "25f05c5fe01a990be615969b667b93b3"
  },
  {
    "url": "card/index.html",
    "revision": "3a0c633775a78ba4b82d726dd41867fe"
  },
  {
    "url": "commin-up/index.html",
    "revision": "e9a2d08310b0cd106c98a2207a37e20f"
  },
  {
    "url": "copenhagen/index.html",
    "revision": "a9ba7600cdccaa5bfcd7db4afc010725"
  },
  {
    "url": "css/revealjs/beige.css",
    "revision": "8a645241ac6e574f4c102edbb3aa6162"
  },
  {
    "url": "css/revealjs/black.css",
    "revision": "8c782b97c4e4e87afa46b0df3638cb69"
  },
  {
    "url": "css/revealjs/blood.css",
    "revision": "5307a5dce447f0012f6e1c243a801b4d"
  },
  {
    "url": "css/revealjs/league.css",
    "revision": "a8e8a19876724fbef81bdedb67d7fda4"
  },
  {
    "url": "css/revealjs/moon.css",
    "revision": "1e394378e35d68c7058b679535a3b966"
  },
  {
    "url": "css/revealjs/night.css",
    "revision": "c41405886f2a667c2fdcd94984dbd8b4"
  },
  {
    "url": "css/revealjs/reveal.css",
    "revision": "42fbec303f358aa63030cfb3fbcd4e6a"
  },
  {
    "url": "css/revealjs/serif.css",
    "revision": "974986f254137efa6ed0efefd2145828"
  },
  {
    "url": "css/revealjs/simple.css",
    "revision": "193b56018e8f35f5fb790b6cea7609d8"
  },
  {
    "url": "css/revealjs/sky.css",
    "revision": "5a352aa493d591d5c2662a3b58dddd8e"
  },
  {
    "url": "css/revealjs/solarized.css",
    "revision": "79e7ae0f0c8cf90d3d56327e1614c410"
  },
  {
    "url": "css/revealjs/white.css",
    "revision": "d71d0ea6a3e5af353eae1498fe90d68d"
  },
  {
    "url": "css/style.css",
    "revision": "86f93f17619827bd4103a7f520afbb0b"
  },
  {
    "url": "deep-work/index.html",
    "revision": "4c42f35becc91ea1a76e15e1b0441adc"
  },
  {
    "url": "design-matters-2020/index.html",
    "revision": "8bb33d656e6ed29deb015608547e81cd"
  },
  {
    "url": "development/index.html",
    "revision": "7aa9c9dd565ae86ea04f2493e0f5242c"
  },
  {
    "url": "good-services/index.html",
    "revision": "8a130fa5a7ca3102ebda4cc6cf3d8895"
  },
  {
    "url": "hello-blog-2/index.html",
    "revision": "6c0b4beaef175f100edf4d1af4c68628"
  },
  {
    "url": "hello-blog/index.html",
    "revision": "e2a0c47e25a41b64e21bb10488c28656"
  },
  {
    "url": "img/basil-crops.jpg",
    "revision": "8dc88dfcc13758e14c77249aaa2f5ca7"
  },
  {
    "url": "img/box-in-system.jpg",
    "revision": "f0fe4464e0265b1c457353d66c337f96"
  },
  {
    "url": "img/bush-from-top.jpg",
    "revision": "441664bc37a3bff50be0abc5786dc2f7"
  },
  {
    "url": "img/card.png",
    "revision": "c4d8a71bf5cd208b171d1cba10b8b887"
  },
  {
    "url": "img/leaf.jpg",
    "revision": "b72e5e30db239eb2ca3c12d780f177a2"
  },
  {
    "url": "img/lil-basils.jpg",
    "revision": "680c5d5519915be280b350c14f745e9a"
  },
  {
    "url": "img/profil.jpg",
    "revision": "a78b720d0a5dd31b032b8c87576463ac"
  },
  {
    "url": "img/qrcode_chrome (1).png",
    "revision": "3750e4e676668f27042122a134ed3233"
  },
  {
    "url": "img/qrcode_chrome.png",
    "revision": "3750e4e676668f27042122a134ed3233"
  },
  {
    "url": "img/qrcode_localhost.png",
    "revision": "b88f31c879babcbd6a68a79ad48d5fb6"
  },
  {
    "url": "img/roots-profile.jpg",
    "revision": "e3df827d80bcfeae97b95f67f39eefbe"
  },
  {
    "url": "img/roots.jpg",
    "revision": "f016b7d01d9ddddbf363910158dd1e3f"
  },
  {
    "url": "img/tomato-under-lights.jpg",
    "revision": "1aa77f487654cbb4576802728d875a78"
  },
  {
    "url": "img/tomato.jpg",
    "revision": "0235fe2cec8cb00d14fd2b0f35575c1d"
  },
  {
    "url": "index.html",
    "revision": "321161a5c0caf0ef6938eff3d75a107c"
  },
  {
    "url": "js/reveal.js",
    "revision": "cf1c3b45a51afa7020371baa9f04916d"
  },
  {
    "url": "links/index.html",
    "revision": "9197ce6e18d2b77c9895cb5dc1080b69"
  },
  {
    "url": "liveable-cities/index.html",
    "revision": "20fcef0ac99c37801f345a8d55b2c25a"
  },
  {
    "url": "manifest.json",
    "revision": "ec76561a5796a97f7b41a5406744acc3"
  },
  {
    "url": "me/index.html",
    "revision": "6b7d0de0dda283659c1e6bb040a4752d"
  },
  {
    "url": "recipes/tepache/index.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "tepache/index.html",
    "revision": "7a1afd97cd601af0abedc152afc1526a"
  },
  {
    "url": "things-to-build/index.html",
    "revision": "48f2f69859a035fc248eafa1326a7d12"
  },
  {
    "url": "trychtyr/index.html",
    "revision": "2901adc79ff36053819776c190eae419"
  },
  {
    "url": "zen-circle.ico",
    "revision": "54ddbed2e7dfc45632818d58a5b3cf3f"
  },
  {
    "url": "zen-circle.png",
    "revision": "9620c1fb4662e895d0e9ac019ceda96a"
  },
  {
    "url": "zen-circle.webp",
    "revision": "89e59f54cf618dedbc5f26ca5ac0543a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
