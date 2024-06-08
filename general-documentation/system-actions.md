---
layout: doc
---
# System actions

Everything in Highlayer is an action.

Smart contract calls are actions, writes to the system are actions.

You can find action structure here - [Action](/general-documentation/common-data-types.md#action).

Below you can find a comprehesive list of system actions.

## allocateGas

Used to burn some token amount (from signer's address) to allocate gas. Must be the first action of any user emitted transaction except [sequencerDeposit](#sequencerDeposit).

Params:
| **Parameter name** | **Parameter data type** | **Description of parameter**                                                                                                    |
|--------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| amount             | String of digits        | Amount of gas to allocate for rest of transaction.                                                                              |
| price              | Integer                 | Price that signer is willing to pay per unit of gas. Must be equal or more than [global gas price](/general-documentation/http-api#global-gas-price). |

Gas cost: `-amount`

## sequencerDeposit

Used to deposit coins to sequencer. See [depositing to sequencer](/general-documentation/depositing-to-sequencer.md) for more details.

Params:
| **Parameter name** | **Parameter data type**            | **Description of parameter**                                                                 |
|--------------------|------------------------------------|----------------------------------------------------------------------------------------------|
| amount             | String of digits                   | Amount of [alans](/general-documentation/common-data-types#alans) to deposit to sequencer.                         |
| accountTo          | String (highlayer/bitcoin address) | Optional address that will receive this sequencer deposit. Will default to signer's address. |

Gas cost: `0`

## transfer

Used to transfer $HI token to another address.

Params:
| **Parameter name** | **Parameter data type**            | **Description of parameter**                             |
|--------------------|------------------------------------|----------------------------------------------------------|
| amount             | String of digits                   | Amount of [alans](/general-documentation/common-data-types#alans) to transfer. |
| recipient          | String (highlayer/bitcoin address) | Address that will receive coins.                         |

Gas cost: `5000`, `10000` on top of it's address entry creation (address has never received anything before).

## uploadData

Used to upload arbitrary data to highlayer. Also the way to upload smart contract sources.

Params:
| **Parameter name** | **Parameter data type** | **Description of parameter**                                                                   |
|--------------------|-------------------------|------------------------------------------------------------------------------------------------|
| data               | String (base64)         | Base64-encoded data (will be decoded by nodes right before storing it) to upload to Highlayer. |

Gas cost: `700` per byte.

## log

Used to log arbitrary data to [address log](/general-documentation/http-api.md#logs)

Params:
| **Parameter name** | **Parameter data type**            | **Description of parameter**   |
|--------------------|------------------------------------|--------------------------------|
| message            | String (or anything stringifyable) | Message to log to account log. |

Gas cost: `1000`

## createContract

Used to instantiate (initialize) contract with source and list of initial actions that contract must execute upon its creation.

Params:
| **Parameter name** | **Parameter data type**                      | **Description of parameter**                                                                                                                                                                 |
|--------------------|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceId           | String                                       | ID of data stored on Highlayer (via [uploadData](#uploadData)) that will be used as contract's source                                                                                        |
| initActions        | List([Action](/general-documentation/common-data-types.md#action)) | List of actions that deployed contract will execute right away after its creation. Usually used to configure contract's [KV](#kvStore) and perform other configuration/initialization steps. |
| gasForInitActions  | String of digits                             | Gas allocated for deployment actions from `initActions` field.                                                                                                                               |

Gas cost: `10000` + amount specified in `gasForInitActions` field.

## kvStore

Used to store entry in account's KV store. Usually acts as database for smart contracts, but also possible to use from user-owned account.

Params:
| **Parameter name** | **Parameter data type** | **Description of parameter**              |
|--------------------|-------------------------|-------------------------------------------|
| key                | String                  | Arbitrary key under which to store value. |
| value              | Any primitive data type | Arbitrary data to store under `key`.      |

Gas cost: `1000` + `700` per byte in `key` field, `100` per byte in `value` field (msgpack-ed before measuring).