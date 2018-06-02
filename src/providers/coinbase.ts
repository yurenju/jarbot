import { promisify } from 'util';

import {
  WalletProvider,
  Transaction,
  Balances,
  WalletAddresses,
  ApiCredential
} from './wallet';
import { Client, Account, Address } from 'coinbase';

export default class Coinbase implements WalletProvider {
  client: Client;

  constructor(opts: ApiCredential) {
    this.client = new Client(opts);
  }

  async getWalletAddresses(username: string): Promise<WalletAddresses> {
    const getAccounts = promisify(this.client.getAccounts.bind(this.client));
    const accounts = await getAccounts({});
    const promises = accounts.map((a: Account) => {
      const createAddress = promisify(a.createAddress.bind(a));
      return createAddress({ name: username });
    });
    const addresses = await Promise.all(promises);
    const result: WalletAddresses = {};
    addresses.forEach((addr: any, i) => {
      let key;
      if (addr.network === 'ethereum') {
        key = 'ETH';
      } else if (addr.network === 'bitcoin') {
        key = 'BTC';
      }
      result[key] = {
        address: addr.address,
        id: addr.id,
        accountId: accounts[i].id
      };
    });
    return result;
  }
  async getTransaction(notification: any): Promise<Transaction> {
    const getAccount = promisify(this.client.getAccount.bind(this.client));
    const account = await getAccount(notification.account.id);
    const getAddress = promisify(account.getAddress.bind(account));
    const addrId = notification.data.id;
    const addr = await getAddress(addrId);
    console.log('got address\n\n\n\n');
    const tx: Transaction = {
      username: addr.name,
      currency: notification.additional_data.currency,
      amount: notification.additional_data.amount
    };

    return tx;
  }
  getBalances(): Balances {
    throw new Error('Method not implemented.');
  }
}
