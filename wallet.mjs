class Wallet
{
  constructor (name = "", blockchain = null)
  {
    this.name = name;
    this.blockchain = blockchain;
    this.publicKey = this.generateRandomPublicKey();
    this.balance = 0;
    this.transactions = [];
  }

  generateRandomPublicKey()
  {
    return Math.random().toString(36).substring(2, 9);
  }

  getWallet ()
  {
    return{
      name: this.name,
      publicKey: this.publicKey,
      balance: this.balance
    };
  }

  updateTransactions ()
  {
    this.transactions = this.blockchain.getChain()
      .flatMap((block) => block.transactions)
      .filter((transaction) => 
        transaction.senderPublicKey === this.publicKey ||
        transaction.receiverPublicKey === this.publicKey);
  }

  updateBalance ()
  {
    this.updateTransactions();
    this.transactions.reduce((balance, transaction) =>
    {
      if (transaction.receiverPublicKey = this.publicKey) return this.balance += transaction.coinAmount;
      if (transaction.senderPublicKey = this.publicKey) return this.balance -= transaction.coinAmount;
    }, 0);
  }
}

export default Wallet;
