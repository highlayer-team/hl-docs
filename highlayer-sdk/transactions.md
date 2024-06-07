# All Transactions

This guide will give examples on all transaction types you can upload

## Sequencer Deposit

Sequencer deposit is used as a measure to stop sequencer attacks, or spam TXs.

```js
const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([Actions.sequencerDeposit({ amount: '1000000' })]); // Amount in Alans
```

## Transfer

Transfer some $HI to another wallet

```js
const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([
		Actions.allocateGas({ amount: '100', price: '10' }),
		Actions.transfer({
			amount: '1000000000000', // 1 $HI
			recipient: 'tb1p0wt007yyzfswhsnwnc45ly9ktyefzyrwznwja0m4gr7n9vjactes80klh4',
		}),
	]);
```

## Upload Data

```js
const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([
		Actions.allocateGas({ amount: '100', price: '10' }),
		Actions.uploadData({
			data: 'Data I want to upload',
		}),
	]);
```

## Create Contract

```js
const transaction = new highlayer.TransactionBuilder()
	.setAddress('ADDRESS') // Your address
	.addActions([
		Actions.allocateGas({ amount: '100000', price: '1' }),
		Actions.createContract({
			sourceId: 'Source Contract ID',
			initActions: [],
			gasForInitActions: '50000',
		}),
	]);
```
