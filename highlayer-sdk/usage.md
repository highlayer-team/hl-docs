---
layout: doc
---

# Installing highlayer-sdk

The highlayer-sdk works 1:1 between Node and Browser envirements (Hopefully)

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
// Firstly you will need to create a signing client

let SigningClient = new highlayer.SigningHighlayerClient({
	sequencer: 'http://sequencer-testnet.highlayer.io/',
	// Node Signing Function using a private key
	signingFunction: highlayer.PrivateKeySigner(PRIVATE_KEY, ADDRESS),
	// Web Wallet Signing Function
	// Should implement respective abstraction to whatever wallet
	signingFunction: function signer(data) {
		return Wallet.signData(data);
	},
});

// Secondly you will create the transaction you want to upload, In this example we will do a sequencer deposit

const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([highlayer.Actions.sequencerDeposit({ amount: '1000000' })]); // Denominuated into 12. 1 $HI being "1000000000000"

// Finaly broadcast the transaction
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
