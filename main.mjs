import Blockchain from "./blockchain.mjs";
import Block from "./block.mjs";
import Transaction from "./transaction.mjs";
import Mempool from "./mempool.mjs";
import Miner from "./miner.mjs";
import Wallet from "./wallet.mjs";

const blockchain = new Blockchain();
const mempool = new Mempool();

const minerWallet = new Wallet("MinerWallet", blockchain, mempool);
const testWallet = new Wallet("TestWallet", blockchain, mempool);

const miner = new Miner(blockchain, mempool, minerWallet);

miner.mineBlock();
miner.mineBlock();

minerWallet.sendCoin(1, testWallet.publicKey);

miner.mineBlock();

console.log(minerWallet.getWallet());
console.log(testWallet.getWallet());