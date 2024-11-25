class Transaction
{
  constructor (amount, sender, receiver)
  {
    this.transactionID = this.generateRandomID();
    this.coinAmount = amount;
    this.senderPublicKey = sender;
    this.receiverPublicKey = receiver;
    this.isConfirmed = false;
  }

  generateRandomID()
  {
    return Math.random().toString(36).substring(2, 9);
  }
}

export default Transaction;
