import listen from 'test-listen';
import micro from 'micro';
import sinon from 'sinon';
import fetch from 'node-fetch';

import notificationFunc from '../src/services/notification';
import mockNotification from './mockNotification';
import { Transaction } from '../src/providers/wallet';

let notificationService;
let notificationUrl;
let chat;
let wallet;
let tx: Transaction;

beforeEach(async () => {
  const addresses = {
    btc: 'btc_addr',
    eth: 'eth_addr'
  };
  tx = {
    username: 'testUser',
    currency: 'BTC',
    amount: '0.1'
  };
  chat = {
    sendNotification: sinon.stub().resolves({})
  };
  wallet = {
    getTransaction: sinon.stub().returns(tx),
    getWalletAddresses: sinon.stub().returns(addresses)
  };
  notificationService = micro(notificationFunc(chat, wallet));
  notificationUrl = await listen(notificationService);
});

afterEach(() => {
  notificationService.close();
});

describe('notification', () => {
  it('accepts ping notification');
  it('sends message to slack when receive a notification', async () => {
    const notification = JSON.parse(JSON.stringify(mockNotification));
    const options = {
      method: 'POST',
      body: JSON.stringify(notification),
      headers: { 'Content-Type': 'application/json' }
    };
    await fetch(notificationUrl, options);
    expect(chat.sendNotification.calledOnce).toBeTruthy();
    expect(
      chat.sendNotification.firstCall.calledWith(
        tx.username,
        tx.currency,
        tx.amount
      )
    ).toBeTruthy();
  });
});
