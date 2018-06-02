import { config } from 'dotenv';
config();

import Coinbase from '../src/providers/coinbase';
import { ApiCredential } from '../src/providers/wallet';

import mockNotification from './mockNotification';

describe('coinbase', () => {
  const opts: ApiCredential = {
    apiKey: process.env.TEST_COINBASE_API_KEY,
    apiSecret: process.env.TEST_COINBASE_API_SECRET
  };

  it('gets addresses from coinbase', async () => {
    const coinbase = new Coinbase(opts);
    const addrs = await coinbase.getWalletAddresses('test-user');
    expect(addrs.btc.address).toBeTruthy;
    expect(addrs.eth.address).toBeTruthy;
  });

  it('gets transaction info from notification object', async () => {
    const notification = JSON.parse(JSON.stringify(mockNotification));
    const coinbase = new Coinbase(opts);
    const addrs = await coinbase.getWalletAddresses('test-user');
    notification.data.id = addrs.eth.id;
    notification.account.id = addrs.eth.accountId;
    const tx = await coinbase.getTransaction(notification);
    expect(tx.username).toEqual('test-user');
  });
});
