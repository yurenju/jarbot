import {
  WalletProvider,
  Transaction,
  Balances,
  WalletAddresses
} from './wallet';

export default class Coinbase implements WalletProvider {
  getWalletAddresses(): WalletAddresses {
    throw new Error('Method not implemented.');
  }
  getTransaction(notification: object): Transaction {
    throw new Error('Method not implemented.');
  }
  getBalances(): Balances {
    throw new Error('Method not implemented.');
  }
}
