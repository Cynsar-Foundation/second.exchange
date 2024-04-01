# Second.Exchange: An Open Source Social Media Experiment

## Introduction

Welcome to Second.Exchange, an experimental social media platform that aims to revolutionize the way we create and consume content online. Our mission is to empower content creators by associating value with their work, thereby fostering quality output and meaningful discussions.

Unlike traditional social media platforms, Second.Exchange is built on the principle of censorship resistance. We believe in the power of free speech and the exchange of ideas, and we're committed to maintaining a platform that upholds these values.

Second.Exchange was built on the [Nostr](https://github.com/fiatjaf/nostr-tools) protocol, which operates without a central authority.

Now , its built on [Willow Protocl](http://willowprotocol.org)

## Current Version 

We are working on releasing version based on willow protocol, check [willow](http://willowprotocol.org). We moved out of nostr due to its complicated nature and prone to centralisation.

1. Nostr is best in many ways but it leaves users to choose where to store data.
2. Nostr has NIP's that may come with a lot of disagreements and confusions over what you can do with your relay.

### Willow works best in our case

1. Works from browser and has inbuilt data stores that can be synced with other peers.


## Key Features

1. Create blog posts, content, or collections that are stored on the client-side and relayed using Nostr.
2. Follow people and content that interest you.
3. Group content based on your preferences and topics of interest.
4. Future features in the pipeline include adding tips, votes, and more.
5. Pay for content to support creators.

## Getting Started

### Development Setup

#### Install the dependencies

```bash
yarn
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

#### Build the app for production

```bash
yarn build
```

## Contribute to Second.Exchange

We welcome contributions from developers of all skill levels. If you're new to open source, we recommend starting with a [good first issue](https://github.com/second-exchange/second-exchange/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

Please note that we use the `main` branch as the default one. All the latest development changes are merged here. The `develop` branch is used for testing, and changes are deployed to production servers via PRs from `develop` to `main`.

Before submitting a PR, please ensure your changes have been thoroughly reviewed. Direct pushes to `main` or `develop` are restricted to maintain code quality.

## Security

Please note that the code in this repository has not been audited. Use at your own risk.

## Live Instance

You can access the live instance of Second.Exchange at https://2nd.exchange.

## Supported By

Second.Exchange is supported by the [Cynsar Foundation](https://cynsar.foundation) and [Cynsar Capital](https://cynsar.capital)


## Donations

If you find value in what we're building, consider supporting us with a donation:

1. BTC: 1JWX5LeF7FtraZu9faJ1ETzTH1CSrXZowS
2. Fiat: Please reach out to admin@cynsar.foundation

Your support helps us continue to innovate and push the boundaries of what's possible with social media. Thank you!
