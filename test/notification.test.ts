import listen from 'test-listen';
import micro from 'micro';
import sinon from 'sinon';
import fetch from 'node-fetch';

import notificationFunc from '../src/notification';
import mockNotification from './mockNotification';
import { Transaction } from '../src/provider/wallet';

let notificationService;
let notificationUrl;
let chat;
let wallet;
let tx: Transaction;

beforeEach(async () => {
  tx = {
    slackName: 'testUser',
    currency: 'BTC',
    amount: '0.1'
  };
  chat = {
    sendNotification: sinon.stub()
  };
  wallet = {
    getTransaction: sinon.stub(),
    getWalletAddresses: sinon.stub().returns(tx)
  };
  notificationService = micro(notificationFunc(chat, wallet));
  notificationUrl = await listen(notificationService);
});

afterEach(() => {
  notificationService.close();
});

describe('notification', () => {
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
        tx.slackName,
        tx.currency,
        tx.amount
      )
    ).toBeTruthy();
  });
});
