class Block
{
  constructor (index, nonce, hash, previousBlockHash, transactions = [])
  {
    this.index = index;
    this.timeStamp = Date.now();
    this.nonce = nonce;
    this.hash = hash;
    this.previousBlockHash = previousBlockHash;
    this.transactions = transactions;
  }

  static createBlock (index, nonce, hash, previousBlockHash, transactions)
  {
    return new Block (index, nonce, hash, previousBlockHash, transactions);
  }

  addTransaction (transactions)
  {
    this.transactions.push(transactions);
  }

  getTransactions () 
  {
    return this.transactions;
  }
}

export default Block;