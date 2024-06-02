---
layout: doc
---

# Installing highlayer-sdk

The highlayer-sdk works 1:1 between Node and Browser envirements

## Node

npm:

```sh
npm i highlayer-sdk
```

yarn:

```sh
yarn add highlayer-sdk
```

## Browsers

You may install it using npm found above, and import it from the "dist" directory

```html
<script src="node_modules/highlayer-sdk/dist/bundle.js"></script>
```

Or

Using unpkg (Or any CDN that scrapes NPM)

```html
<script src="https://unpkg.com/highlayer-sdk/dist/bundle.js"></script>
```

<br>
<br>

# Creating A Transaction

This transaction will create a sequencer deposit, needed for uploading any transaction
See [Transactions](./transactions.md) for examples on all types.

```js
const highlayer = require('highlayer-sdk');
// OR
// <script src="https://unpkg.com/highlayer-sdk/dist/bundle.js"></script>

const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([Actions.sequencerDeposit({ amount: '1000000' })]); // Denominuated into 12. 1 $HI being "1000000000000"
```

<br>
<br>

# Uploading A Transaction

```js
// First-ly you will need to create a signing client

let SigningClient = new highlayer.SigningHighlayerClient({
	sequencer: 'http://sequencer-testnet.highlayer.io/',
	// Node Signing Function
	signingFunction: function signer(data) {
		return highlayer.bip322.Signer.sign(PRIVATE_KEY, ADDRESS, data);
	},
	// Web Wallet Signing Function
	signingFunction: function signer(data) {
		return Wallet.signData(data);
	},
});

let res = await SigningClient.signAndBroadcast(transaction);
/*
{
  hash: 'txHash',
  bundlePosition: x,
  sequencerTxIndex: x,
  parentBundleHash: 'parentBundleHash',
  sequencerSignature: 'sequencerSignature'
}
*/
```
