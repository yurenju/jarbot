export interface WalletAddresses {
  btc: string;
  eth: string;
}

export interface Transaction {
  slackName: string;
  currency: string;
  amount: string;
}

export interface WalletProvider {
  getWalletAddresses(): WalletAddresses;
  getTransaction(notification: object): Transaction;
}
