import sha256 from "sha256";
import Block from "./block.mjs";

class Miner
{
  constructor (blockchain, mempool)
  {
    this.blockchain = blockchain;
    this.mempool = mempool;
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
    const newIndex = lastBlock.index + 1;
    const currentBlockTransactions = this.mempool.getPendingTransactions();
    
    const previousBlockHash = lastBlock.hash;
    const nonce = this.proofOfWork(previousBlockHash, currentBlockTransactions);
    const blockHash = this.hashBlock(previousBlockHash, currentBlockTransactions, nonce);

   

    const newBlock = Block.createBlock(
      newIndex, nonce, blockHash, previousBlockHash, currentBlockTransactions
    );

    this.mempool.clearPendingTransactions();
    this.blockchain.addBlock(newBlock);

    return newBlock;
  }
}

export default Miner;