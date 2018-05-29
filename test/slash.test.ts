import listen from 'test-listen';
import micro from 'micro';

import Slash from './slash';
import slashFunc from '../src/slash';
import { WalletProvider } from '../src/provider/wallet';
import sinon from 'sinon';

let slashService;
let slashUrl;
let slash;
let wallet: WalletProvider;

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
  slashService = micro(slashFunc(wallet));

  slashUrl = await listen(slashService);
  slash = Slash(slashUrl);
});

afterEach(() => {
  slashService.close();
});

describe('getBalance', () => {
  it('shows 2 balances for ETH and BTC', async () => {
    const result = await slash('balance');
    expect(result.attachments.fields.length).toEqual(2);
    const tokenTypes = result.attachments[0].fields.map(a => a.title);
    expect(tokenTypes).toContain('BTC');
    expect(tokenTypes).toContain('ETH');
  });
});

describe('getAddress', () => {
  it('shows 2 addresses for ETH and BTC', async () => {
    const result = await slash('jar');
    expect(result.attachments.fields.length).toEqual(2);
    const tokenTypes = result.attachments[0].fields.map(a => a.title);
    expect(tokenTypes).toContain('BTC');
    expect(tokenTypes).toContain('ETH');
  });
});
