import listen from 'test-listen';
import micro from 'micro';
import sinon from 'sinon';

import Slash from './slash';
import slashFunc from '../src/services/slash';
import { WalletProvider } from '../src/providers/wallet';
import { ChatProvider } from '../src/providers/chat';

let slashService;
let slashUrl;
let slash;
let wallet: WalletProvider;
let chat: ChatProvider;

beforeEach(async () => {
  const addresses = {
    btc: 'btc_addr',
    eth: 'eth_addr'
  };
  const balances = {
    btc: '0.5',
    eth: '0.1'
  };
  wallet = {
    getTransaction: sinon.stub(),
    getWalletAddresses: sinon.stub().returns(addresses),
    getBalances: sinon.stub().returns(balances)
  };
  chat = {
    sendNotification: sinon.stub(),
    formatBalances: sinon.stub().returns({
      attachments: [
        {
          fields: [
            { title: 'BTC', value: '0.1' },
            { title: 'ETH', value: '0.5' }
          ]
        }
      ]
    }),
    formatAddresses: sinon.stub().returns({
      attachments: [
        {
          fields: [
            { title: 'BTC', value: 'btc-addr' },
            { title: 'ETH', value: 'eth-addr' }
          ]
        }
      ]
    })
  };
  slashService = micro(slashFunc(chat, wallet));

  slashUrl = await listen(slashService);
  slash = Slash(slashUrl);
});

afterEach(() => {
  slashService.close();
});

describe('getBalance', () => {
  it('shows 2 balances for ETH and BTC', async () => {
    const result = await slash('balance');
    expect(result.attachments[0].fields.length).toEqual(2);
    const tokenTypes = result.attachments[0].fields.map(a => a.title);
    expect(tokenTypes).toContain('BTC');
    expect(tokenTypes).toContain('ETH');
  });
});

describe('getAddress', () => {
  it('shows 2 addresses for ETH and BTC', async () => {
    const result = await slash('jar');
    expect(result.attachments[0].fields.length).toEqual(2);
    const tokenTypes = result.attachments[0].fields.map(a => a.title);
    expect(tokenTypes).toContain('BTC');
    expect(tokenTypes).toContain('ETH');
  });
});
