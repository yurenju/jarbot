import listen from 'test-listen';
import micro from 'micro';

import notificationFunc from '../src/notification';
import Slack from '../src/provider/slack';
import Coinbase from '../src/provider/coinbase';

import mockNotification from './mockNotification';

jest.mock('../src/provider/slack');
jest.mock('../src/provider/coinbase');

let notificationService;
let notificationUrl;

beforeEach(async () => {
  Slack.mockClear();
  Coinbase.mockClear();

  const slack = new Slack('');
  const coinbase = new Coinbase();
  notificationService = micro(notificationFunc(slack, coinbase));
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
    const mockSendNotification = Slack.mock.instances[0];
    expect(mockSendNotification.mock.calls[0][0]);
    // have to have a mock getTransaction API to mock result
  });
});
