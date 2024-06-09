---
layout: doc
---
# Sequencer deposits

The sequencer requires a deposit of $HI (or $tHI for testnet sequencer) tokens to accept your transactions.

This is a measure to protect the network from spam, and also a way for users to pay for traffic consumption imposed by the network broadcast.

If the network reaches the boundaries of internet bandwidth (measured by mb/s processed by the sequencer), the sequencer will increase the price per byte.

Please note that the sequencer may set arbitrary pricing. If it's unreasonably high, you may still submit a transaction through the Bitcoin network, paying Bitcoin's pricing per byte of data, which the sequencer has no influence over.

You can query the sequencer's prices per byte of data in transaction via [sequencer HTTP API](/general-documentation/http-api.md#fetch-pricing-per-byte)

## Making a deposit

To make a deposit, make a transaction with only 1 action - [sequencerDeposit](/general-documentation/system-actions.md#sequencerdeposit). Do not include `allocateGas` with it - `sequencerDeposit` is free.

Highlayer JS SDK has javascript example of building transaction that deposits to sequencer - [Sequencer Deposit](/highlayer-sdk/transactions.md#sequencer-deposit)

```js
const SigningClient = new highlayer.SigningHighlayerClient({
    // Signing client params, see Highlayer SDK - Usage for details
});

const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([Actions.sequencerDeposit({ amount: '1000000' })]); // Amount in Alans

const res = await SigningClient.signAndBroadcast(transaction);
```

## FAQ on deposits 

Here's a list of frequently asked questions regarding deposits to the sequencer.

### Is paying the sequencer the only fee for transaction to be fully processed?

No, the sequencer fee is only a "gate" fee.

Paying to the sequencer will ensure that your transaction is positioned by the sequencer and broadcasted to the network's nodes. However, for nodes to process your transaction, you must also pay a processing fee (gas allocation fee).

The gas allocation fee is paid per transaction (without the need for a deposit) using the [allocateGas](/general-documentation/system-actions.md#allocategas) system action.

### Why are deposits needed? 

The is a very natural question, because one might assume that we could just pay to the sequencer with system action per every transaction, like we do with gas payment.

While it is possible to implement this, such an implementation would require the sequencer be fully in sync with highlayerd node.

This means that the highlayer sequencer cannot process transaction n+1 before the highlayerd node tied to the sequencer processed transaction n, giving significant decrease to thoughput of sequencer.

Sequencer deposits allow to separate the inclusion from execution, as the sequencer can make a decision about positioning/broadcasting transaction only based on fast, local, offchain state of deposits.

### Is there any transaction that does not need sequencer deposit nor gas fee?

Yes, a transaction that includes only one single action - [sequencerDeposit](/general-documentation/system-actions.md#sequencerdeposit) is free.

This way allows to deposit tokens to the sequencer without a previous deposit of tokens to the sequencer.
