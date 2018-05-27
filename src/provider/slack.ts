import { ChatProvider } from './chat';
import fetch from 'node-fetch';

export class Slack implements ChatProvider {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  sendNotification(user: string, currency: string, amount: string) {
    const body = {
      text: `${user}, ${currency}, ${amount}`
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    };

    return fetch(this.url, options).then(res => res.json);
  }
}
