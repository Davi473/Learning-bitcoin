class Transaction
{
  constructor (coinAmount, senderPublicKey, receiverPublicKey)
  {
    this.transactionID = this.generateRandomID();
    this.coinAmount = coinAmount;
    this.senderPublicKey = senderPublicKey;
    this.receiverPublicKey = receiverPublicKey;
    this.isConfirmed = false;
  }

  generateRandomID()
  {
    return Math.random().toString(36).substring(2, 9);
  }
}

export default Transaction;
