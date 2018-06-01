import micro from 'micro';
import slash from './services/slash';
import notification from './services/notification';
import Coinbase from './providers/coinbase';
import { Slack } from './providers/slack';

const coinbase = new Coinbase();
const slack = new Slack('');

micro(slash(slack, coinbase)).listen(3000);
micro(notification(slack, coinbase)).listen(3001);
