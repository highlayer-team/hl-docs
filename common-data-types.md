---
layout: doc
---
# Common data types
This document contains schemas and structures for the data types you will commonly encounter when developing on Highlayer.

## Alan

Alan is the base unit of the Highlayer network, named in honor of [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing).

An alan represents 1/1,000,000,000,000 (10<sup>-12</sup>) of $HI and $tHI (testnet HI).

Alans are usually represented as a string of digits ("100000000000000"). It is strongly recommended to use arbitrary-precision math libraries, such as [big.js](https://github.com/MikeMcl/big.js) or [mpmath](https://mpmath.org/), for operations involving alans.

![Alan Alan Steve!](/alan.gif)

## Transaction

Transactions on Highlayer are objects encoded using msgpack+base58, with the following fields:

| **Field**          | **Format**               | **Description**                                                                                                                                                                                                                                                |
|--------------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| address            | String (Bitcoin address) | Address of the transaction signer. This can be any valid Bitcoin address supported by BIP-322, encoded in bech32, legacy, or other valid Bitcoin address representations.                                                                                      |
| signature          | String (base64)          | Base64-encoded BIP322 (or BIP137) signature of the extracted/serialized transaction. The fields `signature`, `bundlePosition`, `sequencerTxIndex`, `trueTxIndex`, `parentBundleHash`, and `sequencerSignature` should all be set to `null`.                    |
| nonce              | Number                   | A number used once to alter the hash of a transaction prototype without changing any other fields. This allows, for example, the sending of the same amount to the same address more than once. It does NOT apply globally to an account and can be safely reused in different transactions. |
| actions            | List([Action](#action))  | Actions that the HVM should execute. For security reasons, 'buy gas' actions must precede all other actions.                                                                                                                                                   |
| bundlePosition     | Number                   | A position in a bundle where a transaction is included, assigned by the sequencer.                                                                                                                                                                             |
| sequencerTxIndex   | Number                   | A unique number assigned to a transaction by the sequencer, identifying its position in the global ledger before the addition of transactions submitted to Highlayer via Bitcoin.                                                                              |
| trueTxIndex        | Number                   | A number assigned to a transaction after processing transactions submitted via Bitcoin, available only in responses from the Highlayerd node.                                                                                                                  |
| parentBundleHash   | String (base58)          | Blake2 hash of the previous bundle that will serve as the parent for the current bundle (the bundle in which the transaction is included).                                                                                                                     |
| sequencerSignature | String (base58)          | Base58-encoded Ed25519 sequencer signature of the transaction, with the fields `trueTxIndex` and `sequencerSignature` set to `null`. This can be verified against the Ed25519 public key listed in the [Magic Values](/magic-values) section.                  |   

## Action

Highlayer is an action-based system where each action represents a small, atomic operation that performs a basic task—such as calling another contract, storing a key-value (KV) pair, or emitting an event. 

Transactions on Highlayer carry a list of actions, and contracts return lists of actions as well. All operations within Highlayer that write changes involve actions.

If actions are returned from a smart contract, they must be in the form of an array of javascript objects. When actions are bundled in a transaction, they must be part of the transaction's msgpack-ed data, also represented as an array (list) of objects with the same fields."

Fields of each individual action are as follows:

| **Field** | **Format**       | **Description**                                                                                                                                                                                                                                                      |
|-----------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| action    | String           | The name of the action. If the program is a system, refer to the [List of System Actions](/system-actions). If the program is a contract, the action gets passed to the contract, which then determines how to handle it. Typically, it is used to identify which function to call within the contract. |
| program   | String           | Either `system` or `contract ID`. If set to `system`, the action must correspond to one of the [system actions](/system-actions).                                                                                                                                                     |
| params    | Object           | Arbitrary inputs, consisting of any keys or values, are passed to the program (either a contract or system).                                                                                                                                                          |
