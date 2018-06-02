import { config } from 'dotenv';
config();

import { Slack } from '../src/providers/slack';

describe('slack', () => {
  it('sends notification to slack', async () => {
    const slack = new Slack(process.env.TEST_SLACK_WEBHOOK_URL);
    const result = await slack.sendNotification('test_user', 'ETH', '0.1');
    expect(result.ok).toBeTruthy();
  });
});
