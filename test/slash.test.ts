import listen from 'test-listen';
import micro from 'micro';

import Slash from './slash';
import notificationFunc from '../src/notification';
import slashFunc from '../src/slash';

let notificationService;
let slashService;
let slashUrl;
let notificationUrl;
let slash;

beforeEach(async () => {
  notificationService = micro(notificationFunc('SLACK_URL'));
  slashService = micro(slashFunc());

  slashUrl = await listen(slashService);
  notificationUrl = await listen(notificationService);
  slash = Slash(slashUrl);
});

afterEach(() => {
  notificationService.close();
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
