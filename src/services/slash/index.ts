import { IncomingMessage } from 'http';

import Slash from './slash';
import { Slack } from 'jarbot-provider/slack';
import { Coinbase } from 'jarbot-provider/coinbase';
import { ApiCredential } from 'jarbot-provider/wallet';

const cred: ApiCredential = {
  apiKey: process.env.COINBASE_API_KEY,
  apiSecret: process.env.COINBASE_API_SECRET
};

const slack = new Slack(process.env.SLACK_WEBHOOK_URL);
const coinbase = new Coinbase(cred);

export default Slash(slack, coinbase);
