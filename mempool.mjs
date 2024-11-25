class Mempool
{
  constructor () 
  {
    this.pendingTransactions = [];
  }

  addTransaction (transaction)
  {
    this.pendingTransactions.push(transaction);
  }

  getPendingTransactions ()
  {
    return this.pendingTransactions;
  }

  clearPendingTransactions ()
  {
    this.pendingTransactions = [];
  }
}

export default Mempool;