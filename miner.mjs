import sha256 from "sha256";
import Block from "./block.mjs";
import Transaction from "./transaction.mjs";

class Miner
{
  constructor (blockchain, mempool, wallet)
  {
    this.blockchain = blockchain;
    this.mempool = mempool;
    this.wallet = wallet;
  }

  hashBlock (previousBlockHash, currentBlockTransactions, nonce)
  {
    const dataAsString = previousBlockHash + 
      nonce.toString() + JSON.stringify(currentBlockTransactions);
      const hash = sha256(dataAsString);
      return hash;
  }

  proofOfWork (previousBlockHash, currentBlockTransactions)
  {
    let nonce = 0;
    let hash = this.hashBlock(
      previousBlockHash, currentBlockTransactions, nonce
    );

    while (hash.substring(0, 4) !== "0000")
    {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockTransactions, nonce);
    }

    return nonce;
  }

  mineBlock ()
  {
    const lastBlock = this.blockchain.getLastBlock();
    const previousBlockHash = lastBlock.hash;
    const newIndex = lastBlock.index + 1;
    const currentBlockTransactions = this.mempool.getPendingTransactions();
    const nonce = this.proofOfWork(previousBlockHash, currentBlockTransactions);
    const hash = this.hashBlock(previousBlockHash, currentBlockTransactions, nonce);
    
    
    const coinbase = this.blockchain.coin.mintCoinbase();
    const rewardTransaction = new Transaction(coinbase, "SYSTEM", this.wallet.publicKey);
    this.mempool.addTransaction(rewardTransaction);
   
    const newBlock = Block.createBlock(
      newIndex, nonce, hash, previousBlockHash, currentBlockTransactions
    );
    this.mempool.clearPendingTransactions();
    this.blockchain.addBlock(newBlock);
    this.wallet.updateBalance();

    return newBlock;
  }
}

export default Miner;