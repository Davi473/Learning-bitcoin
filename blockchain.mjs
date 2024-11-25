import Block from "./block.mjs";
import Coin from "./coin.mjs";
import Wallet from "./wallet.mjs";
import Transaction from "./transaction.mjs";

class Blockchain
{
  constructor ()
  {
    this.chain = [];
    this.coin = new Coin("Bitcoin", "BTC", 1000);
    this.genesisWallet = new Wallet("Genesis Wallet", this);
    this.createGenesisBlock();
  }

  createGenesisBlock ()
  {
    const coinBase = this.coin.mintCoinbase();
    const rewardTransaction = new Transaction(coinBase, "", this.genesisWallet.publicKey);
    const genesisBlock = Block.createBlock(1, "0", "0", "0", [rewardTransaction]);
    {this.addBlock(genesisBlock);}
  }

  getChain ()
  {
    return this.chain;
  }

  addBlock(block)
  {
    this.chain.push(block);
    this.confirmTransactions(block.transactions);
  }

  getLastBlock ()
  {
    return this.chain[this.chain.length - 1];
  }

  confirmTransactions(currentBlockTransactions)
  {
    for(const transaction of currentBlockTransactions)
    {
      transaction.isConfirmed = true;
    }
  }
}

export default Blockchain;

