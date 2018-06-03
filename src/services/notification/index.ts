import { IncomingMessage } from 'http';

import Notification from './notification';
import { Slack } from 'jarbot-providers/slack';
import { Coinbase } from 'jarbot-providers/coinbase';
import { ApiCredential } from 'jarbot-providers/wallet';

const cred: ApiCredential = {
  apiKey: process.env.COINBASE_API_KEY,
  apiSecret: process.env.COINBASE_API_SECRET
};

const slack = new Slack(process.env.SLACK_WEBHOOK_URL);
const coinbase = new Coinbase(cred);

export default Notification(slack, coinbase);
