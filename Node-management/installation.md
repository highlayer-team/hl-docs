---
layout: doc
---

# Installing highlayerd node (testnet)

Highlayerd is a daemon node for Highlayer, the fast, low-cost and easy framework for decentralized applications. 

A highlayerd node executes transactions from the Highlayer network, ensures the permanent storage of transactions, and serves smart contract states, acting as a gateway to Highlayer for dApps."

This guide is intended for installing the testnet node, as the mainnet has not yet been released.

## Prerequisites

The minimum requirements are:
- 32+ GB DDR4+ RAM
- 3Ghz+ CPU
- 300+ GB SSD
- 3 TB+ HDD
- 100 Mbps+ Internet connection

Note: Hardware requirements may change as the testnet evolves. Initially, the requirements might be lower; however, the specifications above should remain relevant for a significant amount of time.

Highlayerd is being developed and tested on Debian, but it should work fine on any Linux distribution.

Windows, macOS, and FreeBSD are not supported and will never be due to the use of Linux-exclusive libraries.

To start, install the required packages:

```sh
su root
apt update
apt install -y curl git gcc make glibc-dev
exit
```

### Installing node.js

You will need Node 18.x.x to 20.x.x for Highlayer to run without issues. You can install it from NodeSource with:

```sh
su root
curl -fsSL https://deb.nodesource.com/setup_18.x -o ./nodesource_setup.sh
bash nodesource_setup.sh
apt install -y nodejs
rm ./nodesource_setup.sh
exit
```

Verify the node installation by running the command `node -v`. It should display `v18.`, where `x` represents the minor and patch numbers."

### Installing node-gyp and go

Highlayerd uses some native addons, meaning node-gyp is required to build it.

To install node-gyp, run:

```sh
su root
npm install -g node-gyp
exit
```

VDF library that highlayerd uses is written in Go, so in order to compile it, you will need Golang installed too:

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

After the installation is complete, you need to configure your node.
Open `config.json` in any text editor, and enter the following fields:

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
    "udpPort":4207 // UDP port (used for communication between nodes)
}
```
Some values are network parameters and should always remain constant unless a hardfork is intentional.
For Highlayer testnet, these values are: 
- `sequencerHttpURL`: "http://sequencer-testnet.highlayer.io/"
- `sequencerPubkey`: "dfc8bae0eabca59ff57d4e76a7eb3bf817e0466c4c9db58c7d6f79c83b4c1aae"
- `networkName`: "Highlayer.T/0.4"

`seedPeers` should be a list of valid Highlayer nodes, which can be changed if needed.
If it is not possible to use a seed hosted by the Highlayer team, it is recommended to ask for a seed/peers list from the Highlayer community.

The seed node hosted by the Highlayer team is: `seed-testnet.highlayer.io`

## Running

You can run highlayerd using the following command in the directory where highlayerd is installed:

```sh
node .
```
It is also recommended to run highlayerd with systemd or other process managers like PM2, as this will allow highlayerd to run in the background and automatically start on system launch.

If you are having issues running the highlayerd node, our team and community will be happy to help you on our [Discord server](https://discord.gg/skTbBz8H6S).
