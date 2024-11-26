import Transaction from "./transaction.mjs";

class Wallet
{
  constructor (name = "", blockchain = null, mempool)
  {
    this.name = name;
    this.blockchain = blockchain;
    this.mempool = mempool;
    this.publicKey = this.generateRandomPublicKey();
    this.balance = 0;
    this.transactions = [];
  }

  sendCoin (coinAmount, receiverPublicKey)
  {
    this.updateBalance();
    if (this.balance < coinAmount)
    {
      console.log("Insufficient balance");
      return
    }

    const transaction = new Transaction(
      coinAmount, this.publicKey, receiverPublicKey
    );
    this.mempool.addTransaction(transaction);

    console.log(`Transaction initiated: ${coinAmount} from ${this.publicKey} to ${receiverPublicKey}`);
  }

  generateRandomPublicKey ()
  {
    return Math.random().toString(36).substring(2, 9);
  }

  getWallet ()
  {
    this.updateBalance();
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
    this.balance = this.transactions.reduce((balance, transaction) =>
    {
      if (transaction.receiverPublicKey === this.publicKey)
      {
        balance += transaction.coinAmount;
      } else if (transaction.senderPublicKey === this.publicKey) 
      {
        balance -= transaction.coinAmount;
      }
      return balance
    }, 0);
  }
}

export default Wallet;
