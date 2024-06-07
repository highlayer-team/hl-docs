---
layout: doc
---
# Highlayer HTTP API
Highlayer sequencer/node expose RESTful API for interacting with highlayer and reading state of contracts, balances etc.

This document provides overview of exposed HTTP endpoints, also acting as a reference/standard for implementing custom nodes. 

## Sequencer API

This section describes endpoints exposed by highlayer sequencer. You can find sequencer endpoint in [magic values](/magic-values).


### Fetch transaction by sequencer transaction index

`GET` `/ledger/:sequencerTxIndex`

Sequencer assigns unique number to each transaction it processes in incremental order (if index 2 exists, index 1 must exist too).

<Badge type="info" text="Returns" /> [Transaction](/common-data-types#transaction)


### Fetch available deposit on sequencer

`GET` `/depositBalance/:address`

Fetch current balance on highlayer sequencer. 

Useful when needed to estimate if current deposit is enough for transaction to be accepted by sequencer.

<Badge type="info" text="Returns" />  [Alans](/common-data-types#alan)

See [Depositing to sequencer](/depositing-to-sequencer) for more details.


### Post transaction to highlayer

`POST` `/tx`

Posts transaction to sequencer.

Required headers: 

| **Header name** | **Header value** |
|-----------------|------------------|
| Content-Type    | text/plain       |

Body must be [Transaction](/common-data-types#transaction) in encoded form (base58 msgpack).
