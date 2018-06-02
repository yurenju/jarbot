export interface ApiCredential {
  apiKey: string;
  apiSecret: string;
}

export interface AddressInfo {
  address: string;
  id?: string;
  accountId?: string;
}

export interface WalletAddresses {
  btc?: AddressInfo;
  eth?: AddressInfo;
  [key: string]: AddressInfo;
}

export interface Transaction {
  username: string;
  currency: string;
  amount: string;
}

export interface Balances {
  btc: string;
  eth: string;
  [key: string]: string;
}

export interface WalletProvider {
  getWalletAddresses(username: string): Promise<WalletAddresses>;
  getTransaction(notification: object): Promise<Transaction>;
  getBalances(): Balances;
}
