class Coin
{
  constructor(name, ticker, totalSupply)
  {
    this.name = name;
    this.ticker = ticker;
    this.initialSupply = 0;
    this.actualSupply = this.initialSupply;
    this.totalSupply = totalSupply;
  }

  getCoin ()
  {
    return{
      name: this.name,
      ticker: this.ticker,
      totalSupply: this.totalSupply,
      initialSupply: this.initialSupply,
      actualSupply: this.actualSupply
    }
  }

  mintCoinbase ()
  {
    const amount = 1;
    if (amount <= this.totalSupply && 
      this.actualSupply + amount <= this.totalSupply)
    {
      this.actualSupply += amount;
      return amount;
    } else {
      console.log("Mint exceeded total supply, mint rejected");
    }
    return null;
  }
}

export default Coin;