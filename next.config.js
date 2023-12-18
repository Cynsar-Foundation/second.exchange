/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: "imgix",
    path: "",
  },
  swcMinify: true,
  env:{
    local: true
  },

  publicRuntimeConfig: {
    relays: {
      local: [
        'ws://localhost:8008',
        'wss://nostr.wine'
      ],
      default: [
      "wss://nostr-pub.wellorder.net",
      "wss://nostr-relay.wlvs.space",
      "wss://relay.damus.io",
      "wss://nostr-pub.semisol.dev",
      "wss://nostr.oxtr.dev",
      "wss://nostr-relay.untethr.me"
    ],
      foundation: [
        "wss://relay.cynsar.foundation"
      ]
    }
  }
  
};

module.exports = nextConfig;
