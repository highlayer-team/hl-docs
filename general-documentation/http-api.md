---
layout: doc
---
# Highlayer HTTP API
Highlayer sequencer/node expose RESTful API for interacting with highlayer and reading state of contracts, balances etc.

This document provides overview of exposed HTTP endpoints, also acting as a reference/standard for implementing custom nodes. 

## Sequencer API

This section describes endpoints exposed by the highlayer sequencer. You can find sequencer endpoint in [magic values](/general-documentation/magic-values).


### Fetch transaction by sequencer transaction index

`GET` `/ledger/:sequencerTxIndex`

The sequencer assigns a unique number to each transaction it processes in incremental order (if index 2 exists, index 1 must exist too).

<Badge type="info" text="Returns" /> [Transaction](/general-documentation/common-data-types.md#transaction)


### Fetch available deposit on sequencer

`GET` `/depositBalance/:address`

Fetch current balance on highlayer sequencer. 

It is useful when needed to estimate if a current deposit is enough for the transaction to be accepted by the sequencer.

<Badge type="info" text="Returns" />  [Alans](/general-documentation/common-data-types#alan)

See [Depositing to sequencer](/general-documentation/depositing-to-sequencer.md) for more details.


### Post transaction to highlayer

`POST` `/tx`

Posts transaction to sequencer.

Required headers: 

| **Header name** | **Header value** |
|-----------------|------------------|
| Content-Type    | text/plain       |

Body must be [Transaction](/general-documentation/common-data-types#transaction) in encoded form (base58 msgpack).

### Fetch pricing per byte

`GET` `/sequencer-prices`

Fetches the price that the sequencer will charge per byte of uploaded transaction.
