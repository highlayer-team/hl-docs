---
layout: doc
---
# Sequencer deposits

Sequencer requires deposit of $HI (or tHI for testnet sequencer) tokens to accept your transactions.

This is measure to protect network from spam and a way for users to pay for traffic consumption imposed by network broadcast.

If network hits borders of internet bandwitdth (measured by mb/s processed by sequencer), sequencer will increase price per byte.

Please note that sequencer may set arbitrary pricing, but if it's unreasonably high, you may still submit transaction through bitcoin network, paying bitcoin's pricing per byte of data on which sequencer has no influence.

You can query sequencer's prices per byte of data in transaction via [sequencer HTTP API](/general-documentation/http-api.md#fetch-pricing-per-byte)

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

Here's list of frequently asked questions regarding deposits to sequencer.

### Is paying the sequencer the only fee for transaction to be fully processed?

No, sequencer fee is only "gate" fee.

Paying to sequencer will make sure that your transaction is positioned by sequencer and broadcasted to network's nodes, however for nodes to process your transaction, you must also pay processing fee (gas allocation fee).

Gas allocation fee is paid per transaction (without need for deposit) using the [allocateGas](/general-documentation/system-actions.md#allocategas) system action.

### Why are deposits needed? 

The question is very natural, because why don't we just pay to sequencer with system action per every transaction, like we do with gas payment?

And indeed, it is possible to implement this, however such implementation would require sequencer being fully in sync with highlayerd node.

This means that highlayer sequencer cannot process transaction n+1 before highlayerd node tied to sequencer processed transaction n, giving significant decrease to thoughput of sequencer.

Sequencer deposits allow to separate inclusion from execution, as sequnecer can make a decision about positioning/broadcasting transaction only based on fast local offchain state of deposits.

### Is there any transaction that does not need sequencer deposit nor gas fee?

Yes, a transaction that includes only one single action - [sequencerDeposit](/general-documentation/system-actions.md#sequencerdeposit) is free.

This way allows to deposit tokens to sequencer without previously depositing tokens to sequencer.
