import micro from 'micro';
import slash from './slash';
import notification from './notification';
import Coinbase from './provider/coinbase';
import { Slack } from './provider/slack';

const coinbase = new Coinbase();
const slack = new Slack('');

micro(slash(slack, coinbase)).listen(3000);
micro(notification(slack, coinbase)).listen(3001);
