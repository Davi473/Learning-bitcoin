import Blockchain from "./blockchain.mjs";
import Block from "./block.mjs";
import Transaction from "./transaction.mjs";
import Mempool from "./mempool.mjs";
import Miner from "./miner.mjs";

const blockchain = new Blockchain();

const genesisWallet = blockchain.genesisWallet;

genesisWallet.updateBalance();

console.log(genesisWallet.getWallet());