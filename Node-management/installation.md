---
layout: doc
---

# Installing highlayerd node (testnet)

Highlayerd is a daemon node for highlayer, the fast, cheap and easy framework for decentralized applications. 

Highlayerd node executes transactions from highlayer network, ensures permanent storage of transactions, and serves smart contract states, being able to act as gateway to highlayer for dApps.

This guide is oriented at installing testnet node, as mainnet is yet to be released as for today.

## Prerequisites

You need at least:
- 32+ GB DDR4+ RAM
- 3Ghz+ CPU
- 300+ GB SSD
- 3 TB+ HDD
- 100 Mbps+ Internet connection

Note: Hardware requirements change as testnet evolves, at the start of testnet, requirements might be lower, however specification above should stay relevant for significant amount of time.

Highlayerd is being developed and tested on Debian, however it should work on any Linux distribution.

Windows/MacOS/FreeBSD are not supported and never will be supported due to usage of Linux-exclusive libraries.

To start, install prerequisite packages:

```sh
su root
apt update
apt install -y curl git gcc make glibc-dev
exit
```

### Installing node.js

You will need Node 18.x.x to 20.x.x for highlayer to run without issues. You can install it from NodeSource with:

```sh
su root
curl -fsSL https://deb.nodesource.com/setup_18.x -o ./nodesource_setup.sh
bash nodesource_setup.sh
apt install -y nodejs
rm ./nodesource_setup.sh
exit
```

Verify node installation by running `node -v`, it should display `v18.` and minor/patch numbers.

### Installing node-gyp and go

Highlayerd utilizes some native addons, meaning node-gyp is required to build it.

To install it, run:

```sh
su root
npm install -g node-gyp
exit
```

VDF library that highlayerd uses is written in Go, so to compile it you will need golang installed too:

```sh
su root
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz
echo "export PATH=\$PATH:/usr/local/go/bin" > /etc/profile
exit
source /etc/profile
```

## Installation

To install highlayerd node, first clone the git repository:

```sh
git clone https://github.com/highlayer-team/highlayerd
cd highlayerd
npm install
```

After installation is done, you need to configure your node.
Open `config.json` in any text editor, and enter following fields:

```json5
{
    "sequencerHttpURL":"http://sequencer-testnet.highlayer.io/",
    "seedPeers":["seed-testnet.highlayer.io"],
    "dataDir":"./highlayer-data", // Put path to folder on SSD, writes/reads here will be frequent
    "archiveDataDir":"./highlayer-archive-data", // You can put it on HDD, mostly used for storing transaction data and seeding it to other nodes
    "sequencerPubkey":"dfc8bae0eabca59ff57d4e76a7eb3bf817e0466c4c9db58c7d6f79c83b4c1aae",
    "enableLogging":true, // Note: this is contract logs, which are written to $archiveDataDir/logs, you cannot disable system highlayerd logs going to stdout/stderr
    "networkName":"Highlayer.T/0.4",
    "port":8849, // Http/WebSockets port
    "udpPort":4207, // UDP port (used for communication between nodes)
}
```
Some values are network parameters and should always be constant unless hardfork is intentional.
For Highlayer testnet, these values are: 
- `sequencerHttpURL`: "http://sequencer-testnet.highlayer.io/"
- `sequencerPubkey`: "dfc8bae0eabca59ff57d4e76a7eb3bf817e0466c4c9db58c7d6f79c83b4c1aae"
- `networkName`: "Highlayer.T/0.4"

`seedPeers`, while not directly tied to single value, should be a list of valid highlayer nodes.
If it is not possible to use seed hosted by Highlayer team, it is recommended to ask for seed/peer list from highlayer communities.

Seed node hosted by highlayer team: `seed-testnet.highlayer.io`

## Running

You can run highlayerd with use of following command in the directory where highlayerd was installed:

```sh
node .
```
It is also recommended to run highlayerd with systemd or other process manager like pm2, as it will be able to run highlayerd in background and be able to auto-start on system launch.

If you are having issues with running highlayerd node, we and our community will be happy to help you in our [Discord server](https://discord.gg/skTbBz8H6S).