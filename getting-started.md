---
layout: doc
---

# Getting Started

This guide will help you to get started with highlayer and build your first dApp. 

It focuses on development on testnet, since you can get $tHI (testnet HI) for free in our faucet, and test out your application without any financial risk.

## Wallets

Any bitcoin wallet can be used to sign highlayer transactions, as we use [BIP322](https://github.com/bitcoin/bips/blob/master/bip-0322.mediawiki) as signature method.

Please note that not all bitcoin wallets are able to properly render highlayer transaction data (no amount, receiver, requested fee, contract id, action name, etc).

For testnet release of highlayer, we use bitcoin testnet addresses, so make sure that your wallet supports bitcoin testnet.

This guide will be using [Unisat](https://unisat.io/) when wallet interaction is needed.

We recommend creating clean wallet (with no btc or any other value on it)

## Getting $tHI

To get some tBTC, get a highlayer (or bitcoin) wallet, and post your address in #faucet channel in our [discord server](https://discord.gg/skTbBz8H6S).

## Extracting WIF private key

For the library to be able to deploy/interact with highlayer from node.js, you will need to get WIF key from your wallet.

For Unisat, here's series of screenshots that will help you extract WIF. 

> <span style="color:red">IMPORTANT:</span> Never extract and use WIF of high-value wallet. WIF allows full access to your wallet, meaning if it's compromised, it will lead to loss of all funds on the wallet. Always use temporary low-value wallet that you are not afraid to lose for development purposes.

![Extracting WIF from unisat](extracting-wif-1.png)

![Extracting WIF from unisat](extracting-wif-2.png)

![Extracting WIF from unisat](extracting-wif-3.png)

## Next steps

After you have wallet, tHI on it, and WIF of it extracted and saved, you can proceed to [Writing your first dApp: Cat rating app](guide/cat-app)
