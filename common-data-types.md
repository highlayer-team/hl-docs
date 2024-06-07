---
layout: doc
---
# Common data types
This document contains schemas and structures for data types that you will be dealing with commonly when developing on highlayer.

## Alans

Alan is the base unit of the Highlayer network.

Named in honor of [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing), alan represents 1/1000000000000 (12 zeros) of $HI and $tHI (testnet HI).

Usually alans are represented in format of string of digits ("100000000000000"), and it is strongly recommended to use arbitrary-precision math libraries (like [big.js](https://github.com/MikeMcl/big.js) or [mpmath](https://mpmath.org/)) for operations on it.

![Alan Alan Steve!](/alan.gif)

## Transaction

Transactions in highlayer are msgpack+base58 encoded objects with following fields:

| **Field**          | **Format**               | **Description**                                                                                                                                                                                                                                                |
|--------------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| address            | String (Bitcoin address) | Address of transaction signer. Can be any valid Bitcoin address supported by BIP-322.  Encoded in bech32, legacy or other valid representations of bitcoin address.                                                                                            |
| signature          | String (base64)          | Base64 encoded BIP322 (or BIP137) signature of extracted/serialized transaction with fields `signature`, `bundlePosition`, `sequencerTxIndex`, `trueTxIndex`, `parentBundleHash` and `sequencerSignature` set to `null`.                                       |
| nonce              | Number                   | Number used once. Used to change transaction prototype's hash without changing any other fields (to allow for example sending same amount to same address more than once). Does NOT apply globally to account (can be safely reused in different transaction). |
| actions            | List([Action](#action))  | Actions that HVM should execute. Buy gas actions should go before other actions (it is forced because of security concerns).                                                                                                                                   |
| bundlePosition     | Number                   | Position in bundle where transaction is included. Assigned by sequencer.                                                                                                                                                                                       |
| sequencerTxIndex   | Number                   | Unique number of transaction assigned by sequencer, identifying its place in global ledger before applying transactions submitted to highlayer via bitcoin.                                                                                                    |
| trueTxIndex        | Number                   | Number of transaction after applying transactions submitted via bitcoin, only available in response from highlayerd node.                                                                                                                                      |
| parentBundleHash   | String (base58)          | Blake2 hash bundle that will be previous (parent) for current bundle (bundle where transaction is included in).                                                                                                                                                |
| sequencerSignature | String (base58)          | Base58 encoded ed25519 sequencer signature of transaction with fields `trueTxIndex`,`sequencerSignature` set to null. Can be verified against ed25519 pubkey in [Magic Values](/magic-values) section.                                                         |   

## Action

Highlayer is action-based system. Each ation is a little atomic operation that does some elementary thing - like calling other contract, storing KV value, or emitting event.
Transactions carry actions list, contracts return actions list too. Everything happening on highlayer involves actions to write changes.

If actions are returned from smart contract, it must be array of javascript objects, if actions are bundled in transaction, it must be part of transaction's msgpack-ed data, also representing array (list) of objects with same fields.

Fields of each individual action are as follows:

| **Field** | **Format**       | **Description**                                                                                                                                                                                                                                                      |
|-----------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| action    | String           | Action's name. If program is system, see [List of system actions](/system-actions). If program is a contract, it will get passed to contract and it can determine what to do with it.  Usually in such case it's used to determine function to call in the contract. |
| program   | String           | Either `system` or contract ID. In case of being system, action must be one of [system actions](/system-actions)                                                                                                                                                     |
| params    | Object           | Arbitrary input to program (contract or system) with any keys or values. Gets passed to contract or system.                                                                                                                                                          |

