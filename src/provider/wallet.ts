export interface WalletAddresses {
  btc: string;
  eth: string;
  [key: string]: string;
}

export interface Transaction {
  slackName: string;
  currency: string;
  amount: string;
}

export interface Balances {
  btc: string;
  eth: string;
  [key: string]: string;
}

export interface WalletProvider {
  getWalletAddresses(): WalletAddresses;
  getTransaction(notification: object): Transaction;
  getBalances(): Balances;
}
